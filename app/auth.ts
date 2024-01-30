/**
 * NextAuth's config options
 * @see https://authjs.dev/guides/
 */
import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/db";
import { profiles } from "./drizzle/accounts/profiles";

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    FortyTwoProvider({
      clientId: process.env.AUTH_42_SCHOOL_CLIENT_ID,
      clientSecret: process.env.AUTH_42_SCHOOL_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    }
  },
  events: {
    async linkAccount({ user }) {
      // Create a profile for the user if it doesn't exist
      if (user) {
        await db
          .insert(profiles)
          .values({
            userId: user.id
          })
          .onConflictDoNothing();
      }
    }
  }
});
