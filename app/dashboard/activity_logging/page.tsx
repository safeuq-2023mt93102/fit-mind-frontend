import LogActivity from "@/app/components/LogActivity";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

async function ActivityLog() {
  const session = await auth()
  if (session) {
    return (
      <>
        <LogActivity/>
      </>
    );
  }
  redirect("/");
}

export default ActivityLog;