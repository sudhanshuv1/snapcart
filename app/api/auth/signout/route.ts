import { NextRequest, NextResponse } from "next/server";
import { getAppAuthUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getAppAuthUser(request);
  if (user) {
    user.currentToken = "";
    await user.save();
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("shopclone-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
