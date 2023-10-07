export const config = {
  // matcher: ["/profile"],

  matcher: ["/((?!register|api|login|registration|email-verification|get-started|dashboard|transaction|home|reset-password|forget-password|otp|reset-success).*)"],

}

export { default } from "next-auth/middleware"
