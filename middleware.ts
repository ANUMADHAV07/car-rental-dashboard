import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("session");
  if (!token?.value) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = await decrypt(token.value);
  if (!payload) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth|register).*)"],
};
