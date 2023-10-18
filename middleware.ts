export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/articles/:path*",
    "/sheets/:path*",
  ],
};
