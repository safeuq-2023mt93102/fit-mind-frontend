import Navbar from "@/app/components/Navbar";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";

export default function HomePage({session}:{session: Session | null}) {
  return (
    <SessionProvider session={session}>
      <Navbar/>
    </SessionProvider>
  );
}