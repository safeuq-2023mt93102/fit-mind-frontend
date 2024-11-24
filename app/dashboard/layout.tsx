"use client";

import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import React from "react";
import {Layout} from "antd";
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

export default function RootLayout(
  {children}: Readonly<{ children: React.ReactNode; }>) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname();

  if (!session) {
    console.log("Session is present");
    return router.push("/");
  }

  let selectedPage: string = pathname.substring(pathname.lastIndexOf('/') + 1);
  return (
    <>
      <Layout style={{height: "100%"}}>
        <Navbar/>
        <Layout style={{height: "100%"}} className={"!flex !flex-row"}>
          <Sidebar selected={selectedPage}/>
          <Layout.Content style={{marginInlineStart: 200, marginTop: 64}}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}