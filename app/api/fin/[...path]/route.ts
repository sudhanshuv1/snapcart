import { NextRequest, NextResponse } from "next/server";
import { randomUUID, timingSafeEqual } from "node:crypto";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/db/models/User";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const FIN_WORKSPACE_TOKEN = process.env.FIN_WORKSPACE_TOKEN;
const BODY_LOG_MAX = 1000;
const REDACTED_HEADERS = new Set(["authorization", "cookie", "proxy-authorization"]);

// Upstream paths Fin is allowed to call through this proxy.
// Each entry is matched against the joined `params.path`.
const PATH_ALLOWLIST = new Set([
  "orders",
  "auth/me",
  "auth/profile",
  "wishlist",
  "cart",
]);

function log(
  reqId: string,
  event: string,
  details: Record<string, unknown> = {}
) {
  console.log(`[fin] ${event}`, { reqId, ts: new Date().toISOString(), ...details });
}

function truncate(s: string, max = BODY_LOG_MAX): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…[+${s.length - max} chars]`;
}

function headersToObject(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((value, key) => {
    out[key] = REDACTED_HEADERS.has(key.toLowerCase())
      ? `[REDACTED len=${value.length}]`
      : value;
  });
  return out;
}

function verifyWorkspaceToken(
  request: NextRequest,
  reqId: string
): { ok: boolean; reason?: string } {
  if (!FIN_WORKSPACE_TOKEN) return { ok: false, reason: "env_not_set" };
  const header = request.headers.get("authorization") ?? "";
  if (!header) return { ok: false, reason: "no_auth_header" };
  if (!header.startsWith("Bearer ")) return { ok: false, reason: "wrong_scheme" };
  const provided = Buffer.from(header.slice(7));
  const expected = Buffer.from(FIN_WORKSPACE_TOKEN);
  if (provided.length !== expected.length) {
    log(reqId, "workspace token length mismatch", {
      providedLen: provided.length,
      expectedLen: expected.length,
    });
    return { ok: false, reason: "length_mismatch" };
  }
  const ok = timingSafeEqual(provided, expected);
  return ok ? { ok: true } : { ok: false, reason: "value_mismatch" };
}

async function handle(
  request: NextRequest,
  ctx: { params: { path: string[] } }
) {
  const reqId = randomUUID();
  const startedAt = Date.now();
  const url = new URL(request.url);
  const upstreamPath = (ctx.params.path ?? []).join("/");

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null;

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const bodyText = hasBody ? await request.text() : undefined;
  const queryEntries: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    queryEntries[key] = value;
  });

  log(reqId, "request received", {
    method: request.method,
    upstreamPath,
    url: request.url,
    pathname: url.pathname,
    query: queryEntries,
    headers: headersToObject(request.headers),
    clientIp,
    bodyBytes: bodyText?.length ?? 0,
    body: bodyText !== undefined ? truncate(bodyText) : null,
  });

  const tokenCheck = verifyWorkspaceToken(request, reqId);
  if (!tokenCheck.ok) {
    log(reqId, "workspace token rejected", {
      reason: tokenCheck.reason,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  log(reqId, "workspace token verified");

  if (!PATH_ALLOWLIST.has(upstreamPath)) {
    log(reqId, "path rejected", {
      upstreamPath,
      allowlistSize: PATH_ALLOWLIST.size,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      { error: `Path not allowed: ${upstreamPath}` },
      { status: 403 }
    );
  }

  const email = url.searchParams.get("email");
  const userIdParam = url.searchParams.get("user_id");

  if (!email && !userIdParam) {
    log(reqId, "missing user identifier", {
      queryKeys: Array.from(url.searchParams.keys()),
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      { error: "Missing user identifier — pass ?email=... or ?user_id=..." },
      { status: 400 }
    );
  }

  log(reqId, "user lookup start", {
    by: email ? "email" : "user_id",
    email: email ?? null,
    userIdParam: userIdParam ?? null,
  });

  await dbConnect();
  const user = email
    ? await User.findOne({ email: email.toLowerCase().trim() })
    : await User.findById(userIdParam);

  if (!user) {
    log(reqId, "user not found", {
      by: email ? "email" : "user_id",
      email: email ?? null,
      userIdParam: userIdParam ?? null,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  log(reqId, "user resolved", {
    userId: user._id.toString(),
    email: user.email,
  });

  const userToken = user.currentToken;
  if (!userToken) {
    log(reqId, "user has no stored token", {
      userId: user._id.toString(),
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      { error: "User has no active session — they need to sign in again" },
      { status: 401 }
    );
  }
  try {
    verifyToken(userToken);
  } catch (err) {
    log(reqId, "stored token invalid", {
      userId: user._id.toString(),
      reason: err instanceof Error ? err.message : String(err),
      tokenLen: userToken.length,
      durationMs: Date.now() - startedAt,
    });
    return NextResponse.json(
      { error: "User session expired — they need to sign in again" },
      { status: 401 }
    );
  }

  const upstreamUrl = new URL(`/api/${upstreamPath}`, request.url);
  url.searchParams.forEach((value, key) => {
    if (key === "email" || key === "user_id") return;
    upstreamUrl.searchParams.append(key, value);
  });

  const headers = new Headers();
  headers.set("authorization", `Bearer ${userToken}`);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  log(reqId, "upstream call begin", {
    method: request.method,
    upstreamUrl: upstreamUrl.toString(),
    forwardedQueryKeys: Array.from(upstreamUrl.searchParams.keys()),
    hasBody: bodyText !== undefined,
    bodyBytes: bodyText?.length ?? 0,
    userId: user._id.toString(),
  });

  const upstreamStart = Date.now();
  const init: RequestInit = { method: request.method, headers };
  if (bodyText !== undefined) init.body = bodyText;

  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, init);
  } catch (err) {
    log(reqId, "upstream fetch failed", {
      reason: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - startedAt,
      upstreamDurationMs: Date.now() - upstreamStart,
    });
    return NextResponse.json(
      { error: "Upstream call failed" },
      { status: 502 }
    );
  }

  const responseBody = await upstream.text();
  const upstreamDurationMs = Date.now() - upstreamStart;
  const totalDurationMs = Date.now() - startedAt;

  log(reqId, "upstream response", {
    status: upstream.status,
    upstreamDurationMs,
    totalDurationMs,
    responseBytes: responseBody.length,
    contentType: upstream.headers.get("content-type"),
    bodyPreview: truncate(responseBody),
  });

  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(
  request: NextRequest,
  ctx: { params: { path: string[] } }
) {
  return handle(request, ctx);
}

export async function POST(
  request: NextRequest,
  ctx: { params: { path: string[] } }
) {
  return handle(request, ctx);
}

export async function PUT(
  request: NextRequest,
  ctx: { params: { path: string[] } }
) {
  return handle(request, ctx);
}

export async function PATCH(
  request: NextRequest,
  ctx: { params: { path: string[] } }
) {
  return handle(request, ctx);
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: { path: string[] } }
) {
  return handle(request, ctx);
}
