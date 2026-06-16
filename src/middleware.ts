import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/operator/") && !pathname.startsWith("/operator/login")) {
    const token = request.cookies.get("operator-token");
    const validToken = process.env.OPERATOR_TOKEN || "lj-secure-token-2024";

    if (!token || token.value !== validToken) {
      return NextResponse.redirect(new URL("/operator", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/operator/:path+"],
};
