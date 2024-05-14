import ActivityLogger from "@/app/components/ActivityLogging";
import LogActivity from "@/app/components/LogActivity";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import HomePage from "@/app/components/HomePage";
import Login from "@/app/components/Login";
import {redirect} from "next/navigation";

async function ActivityLog() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        <LogActivity/>
        {/*<ActivityLogger/>*/}
      </>
    );
  }
  redirect("/");
}

export default ActivityLog;