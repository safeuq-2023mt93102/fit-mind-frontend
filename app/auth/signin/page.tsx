"use client"
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const session = useSession()
  if (session) {
    return router.push("/dashboard");
  }
  signIn("keycloak");
}