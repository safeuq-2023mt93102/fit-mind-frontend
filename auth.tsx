import NextAuth, {Profile} from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import {ISession, IToken} from "@/interfaces/auth/interface";

interface JwtParams {
  token: IToken
  account: any
  profile: Profile
}

interface SessionParams {
  session: ISession
  token: IToken
}

// signIn and signOut are for use in server components
export const {auth, handlers, signIn, signOut} = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  callbacks: {
    async jwt(params: any) {
      // Persist the OAuth access_token to the token right after signin
      let jwtParams: JwtParams = params;
      let token: IToken = jwtParams.token;
      if (jwtParams.account) {
        token.accessToken = jwtParams.account["access_token"]
        token.provider = jwtParams.account["provider"]
        token.idToken = jwtParams.account["id_token"]
      }
      return token
    },
    async session(params: any) {
      // Send properties to the client, like an access_token from a provider.
      const sessionParams: SessionParams = params
      const session: ISession = sessionParams.session;
      session.accessToken = sessionParams.token.accessToken
      return session
    }
  },
  events: {
    async signOut(message: any) {
      const token: IToken = message.token
      if (token.provider === "keycloak") {
        const issuerUrl = process.env.KEYCLOAK_ISSUER
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
        logOutUrl.searchParams.set("id_token_hint", token.idToken)
        await fetch(logOutUrl);
      }
    }
  }
})