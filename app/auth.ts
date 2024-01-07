/**
 * NextAuth's config options
 * @see https://authjs.dev/guides/
 */
import NextAuth from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    FortyTwoProvider({
      clientId: process.env.AUTH_42_SCHOOL_CLIENT_ID,
      clientSecret: process.env.AUTH_42_SCHOOL_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, profile }) {
      if (profile && trigger === "signIn") {
        return {
          ...token,
          user: {
            login: profile.login,
            isStaff: profile["staff?"],
          },
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        login: token.user.login,
        isStaff: token.user.isStaff,
      };
      return session;
    },
  },
});
