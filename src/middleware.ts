export const config = {
  // matcher: ["/profile"],
  matcher: ["/((?!register|api|login|registration|email-verification|get-started|dashboard|transaction|home|reset-password|forget-password|otp|reset-success|success|invoice|generate-invoice).*)"],

}

export { default } from "next-auth/middleware"
