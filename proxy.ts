import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname.startsWith("/en") ? "en" : "zh-Hant";
  requestHeaders.set("x-serene-document-language", locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/zh/:path*", "/en/:path*"],
};
