// import {getServerSession} from 'next-auth/next'
import {auth} from "@/auth";
import HomePage from "@/app/components/HomePage";
import Dashboard from "@/app/dashboard/page";
import {redirect} from "next/navigation";

async function App() {
  const session = await auth()
  if (session) {
    console.log("Session is present");
    return redirect("/dashboard");
  }
  console.log("No session present");
  return (<HomePage session={session}/>);
}

export default App;