/**
 * This module extends the types and interfaces provided by the NextAuth library.
 * It defines additional properties for the `Session` and `JWT` objects, and
 * extends the `Profile` interface to include properties specific to the 42 School provider.
 * See: https://next-auth.js.org/getting-started/typescript
 */
import NextAuth, { DefaultSession, Profile } from "next-auth"
import { FortyTwoProfile } from "next-auth/providers/42-school";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      login: string
    } & DefaultSession["user"]
  }
  interface Profile extends FortyTwoProfile {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      login: string
    }
  }
}