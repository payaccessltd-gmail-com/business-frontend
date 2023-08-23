export const config = {
  // matcher: ["/profile"],

  matcher: ["/((?!register|api|login|registration|email-verification|get-started|dashboard|transaction).*)"],

}

export { default } from "next-auth/middleware"
