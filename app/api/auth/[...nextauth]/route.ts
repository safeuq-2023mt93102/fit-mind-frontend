// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "next-auth/jwt";
import {handlers} from "@/auth";
export const { GET, POST } = handlers

// export const authOptions: AuthOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
//       issuer: process.env.KEYCLOAK_ISSUER
//     })
//   ],
//   callbacks: {
//     async jwt({token, account}) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//         token.provider = account.provider
//         token.id_token = account.id_token
//       }
//       return token
//     },
//     async session({session, token, user}) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken
//       return session
//     }
//   },
//   events: {
//     async signOut({token}) {
//       if (token.provider === "keycloak") {
//         const issuerUrl = (authOptions.providers.find(p => p.id === "keycloak"))?.options.issuer
//         const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
//         logOutUrl.searchParams.set("id_token_hint", token.id_token)
//         await fetch(logOutUrl);
//       }
//     },
//   }
// };
