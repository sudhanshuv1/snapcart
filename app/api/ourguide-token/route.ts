import { NextRequest, NextResponse } from "next/server";
import { getAppAuthUser, signOurguideToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getAppAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const token = signOurguideToken({
      userId: user._id.toString(),
      exp,
      email: user.email,
      name: user.name,
    });

    return NextResponse.json({ token });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("Ourguide token error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
