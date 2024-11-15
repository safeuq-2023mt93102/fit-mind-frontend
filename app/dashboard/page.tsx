import {redirect} from "next/navigation";
import {auth} from "@/auth";
import Dashboard from "@/app/components/Dashboard";

export default async function DashboardPage() {
  const session = await auth()
  if (!session) {
    console.log("Session is present");
    return redirect("/");
  }
  return (<Dashboard session={session}/>);
}