import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SharePageView from "@/app/components/SharePageView";

async function SharePage() {
  const session = await auth()
  if (session) {
    return <SharePageView />;
  }
  redirect("/");
}

export default SharePage;
