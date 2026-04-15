import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import User, { IUser } from "@/lib/db/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;
const OURGUIDE_AUTH_SECRET =
  process.env.OURGUIDE_AUTH_SECRET ?? process.env.OURGUIDE_VERIFICATION_SECRET;

interface JwtPayload {
  userId: string;
}

interface OurguideJwtPayload {
  user_id: string;
  email?: string;
  name?: string;
}

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function signOurguideToken(params: {
  userId: string;
  email?: string;
  name?: string;
  exp: number;
}): string {
  if (!OURGUIDE_AUTH_SECRET) {
    throw new Error("OURGUIDE_AUTH_SECRET is not set");
  }
  return jwt.sign(
    {
      user_id: params.userId,
      exp: params.exp,
      email: params.email,
      name: params.name,
    },
    OURGUIDE_AUTH_SECRET,
    { algorithm: "HS256" }
  );
}

export function verifyOurguideToken(token: string): OurguideJwtPayload {
  if (!OURGUIDE_AUTH_SECRET) {
    throw new Error("OURGUIDE_AUTH_SECRET is not set");
  }
  return jwt.verify(token, OURGUIDE_AUTH_SECRET) as OurguideJwtPayload;
}

function getBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}

function getOurguideHeaderToken(request: NextRequest): string | null {
  const raw = request.headers.get("x-ourguide-token");
  if (!raw) return null;
  return raw.trim() || null;
}

function getCookieToken(request: NextRequest): string | null {
  return request.cookies.get("shopclone-session")?.value ?? null;
}

export async function getAppAuthUser(request: NextRequest): Promise<IUser | null> {
  const token = getBearerToken(request) ?? getCookieToken(request);
  if (!token) {
    console.log("[auth] getAppAuthUser: no token found on request");
    return null;
  }

  try {
    const payload = verifyToken(token);
    await dbConnect();
    const user = await User.findById(payload.userId);
    if (!user) {
      console.log("[auth] getAppAuthUser: token valid but user not found", { userId: payload.userId });
    }
    return user;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("[auth] getAppAuthUser: verify failed", { message, tokenLen: token.length });
    return null;
  }
}

export async function getAuthUser(request: NextRequest): Promise<IUser | null> {
  const token = getBearerToken(request) ?? getOurguideHeaderToken(request) ?? getCookieToken(request);
  if (!token) return null;

  // 1) Normal app auth token (JWT_SECRET)
  try {
    const payload = verifyToken(token);
    await dbConnect();
    return await User.findById(payload.userId);
  } catch {
    // fall through
  }

  // 2) Ourguide verification token (OURGUIDE_AUTH_SECRET)
  if (!OURGUIDE_AUTH_SECRET) return null;
  try {
    const payload = verifyOurguideToken(token);
    await dbConnect();
    return await User.findById(payload.user_id);
  } catch {
    return null;
  }
}

export function userToPublic(user: IUser) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    dob: user.dob,
    address: user.address
      ? {
          street: user.address.street || "",
          city: user.address.city || "",
          state: user.address.state || "",
          zipCode: user.address.zipCode || "",
          country: user.address.country || "",
        }
      : { street: "", city: "", state: "", zipCode: "", country: "" },
  };
}
