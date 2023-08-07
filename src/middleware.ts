export { default } from "next-auth/middleware"

export const config = {
  // matcher: ["/profile"],
  matcher: ["/((?!register|api|login|registration|email-verification).*)"],
}
