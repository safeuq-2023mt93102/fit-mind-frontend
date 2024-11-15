import HomePage from "@/app/components/HomePage";
// import {getServerSession} from 'next-auth/next'
import {auth} from "@/auth";
import Logout from "@/app/components/Logout";
import Login from "@/app/components/Login";
import {SessionProvider} from "next-auth/react";

async function App() {
  const session = await auth()
  if (!session) {
    return (<Login/>);
  }
  return (<HomePage session={session}/>);
}

export default App;