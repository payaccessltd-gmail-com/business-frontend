// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginApi } from "api/login"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const payload = {
          username: credentials?.username as string,
          password: credentials?.password as string,
        }

        if (!credentials?.username || !credentials.password) {
          return null
        }

        const res = await loginApi(payload)

        const user: { username: string; token: string } = (await res.json()) as never

        if (!res.ok) {
          throw new Error("api could not be reached")
        }
        // If no error and we have user data token, return it
        if (res.ok && (user.token as string)) {
          console.log(user)
          delete user.token
          return { ...user, email: user.username, id: user.username }
        }

        // Return null if user data could not be retrieved
        return null
      },

      callbacks: {
        async signIn({ user, account, profile, username, credentials }) {
          console.log({ user, account, profile, username, credentials })
          return true
        },
        async redirect({ url, baseUrl }) {
          console.log({ url })
          return baseUrl
        },
        async session({ session, token }) {
          console.log({ session, token }, "---------------------------")
          return session
        },
        async jwt({ token }) {
          return token
        },
      },
    }),
    // ...add more providers here
  ],

  jwt: {
    signingKey: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
}
