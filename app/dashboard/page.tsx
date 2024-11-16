import {redirect} from "next/navigation";
import {auth} from "@/auth";

export default async function DashboardPage() {
  const session = await auth()
  if (!session) {
    console.log("Session is present");
    return redirect("/");
  }
  redirect("/dashboard/activity_logging");
}