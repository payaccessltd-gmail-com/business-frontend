// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginApi } from "api/login"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
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
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
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

        console.log({ user })

        if (!res.ok) {
          throw new Error("api could not be reached")
        }
        // If no error and we have user data token, return it
        if (res.ok && (user.token as string)) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      },

      callbacks: {
        async signIn(value) {
          console.log("sign in call back", value)
          return true
        },
        // async jwt({ token, user, account }) {
        async jwt(value) {
          console.log(value)
          // if (account && user) {
          //   return {
          //     ...token,
          //     accessToken: user.token,
          //     refreshToken: user.refreshToken,
          //   }
          // }

          return token
        },

        async session({ session, token }) {
          console.log({ session, token })
          session.user.accessToken = token.accessToken
          session.user.refreshToken = token.refreshToken
          session.user.accessTokenExpires = token.accessTokenExpires

          return session
        },
      },
    }),
    // ...add more providers here
  ],

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
}
