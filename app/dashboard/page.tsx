import HomePage from "@/app/components/HomePage";
import {getServerSession} from 'next-auth'
import {SessionProvider} from "next-auth/react";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <HomePage session={session}/>
    );
  }
  redirect("/");
}

export default Home;