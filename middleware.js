export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/suite/dashboard/:path*",
    "/suite/clients/:path*",
    "/suite/contracts/:path*",
    "/suite/settings/:path*",
  ],
};
