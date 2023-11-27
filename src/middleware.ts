import { NextRequest, NextResponse } from "next/server";
import { getDomain, getValidSubdomain } from "@/lib/url";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const host = req.headers.get("host");

  const domain = getDomain(host);

  const subdomain = getValidSubdomain(host);
  console.log("dev subdomain: ", subdomain);

  if (domain && subdomain && subdomain !== "www") {
    url.pathname = `/${domain}/${subdomain}${url.pathname}`;
  }

  if (domain && !subdomain) {
    url.pathname = `/${domain}${url.pathname}`;
  }

  if (domain && !subdomain && url.pathname !== `/${domain}/`) {
    return NextResponse.rewrite(new URL(`/not-found`, req.url));
  }

  return NextResponse.rewrite(url);
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
