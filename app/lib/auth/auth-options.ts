/**
 * Configuration options for NextAuth. 
 * See: https://next-auth.js.org/configuration/options
 * See: app/types/next-auth.d.ts for type definitions.
 *
 * @typedef {Object} AuthOptions
 * @property {Array} providers - An array of authentication providers to use.
 * @property {Object} callbacks - An object containing functions to handle authentication callbacks.
 * @property {Function} callbacks.jwt - A function to handle JWT generation and decoding.
 *   This function is called whenever a user signs in or refreshes their token.
 *   It receives an object with the following properties:
 *     - token: The current JWT token.
 *     - trigger: The event that triggered the JWT generation.
 *     - profile: The user profile returned by the authentication provider.
 *   If the `profile` and `trigger` properties are present, the function should return a new token object
 *   with the `user` property set to an object containing the user's login name.
 *   Otherwise, it should return the original token object.
 * @property {Function} callbacks.session - A function to handle session serialization and deserialization.
 *   This function is called whenever a user signs in or refreshes their token.
 *   It receives an object with the following properties:
 *     - session: The current session object.
 *     - token: The current JWT token.
 *   The function should update the `session.user` object with the user's login name from the token,
 *   and return the updated session object.
 */
import type { NextAuthOptions } from 'next-auth'
import FortyTwoProvider from "next-auth/providers/42-school";

export const authOptions: NextAuthOptions = {
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID as string,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ token, trigger, profile }) {
      if (profile && trigger === 'signIn') {
        return {
          ...token,
          user: {
            login: profile.login,
          }
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        login: token.user.login,
      }
      return session
    }
  },
}