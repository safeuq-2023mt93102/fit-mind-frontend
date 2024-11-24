// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "next-auth/jwt";
import {handlers} from "@/auth";
export const { GET, POST } = handlers
