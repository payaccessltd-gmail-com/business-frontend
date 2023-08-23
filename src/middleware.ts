export const config = {
  // matcher: ["/profile"],
  matcher: ["/((?!register|api|login|registration|email-verification).*)"],
}

export { default } from "next-auth/middleware"
