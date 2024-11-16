"use client";

import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import React from "react";
import {Layout} from "antd";

export default function RootLayout(
  {children}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <>
      <Layout style={{height: "100%"}}>
        <Navbar/>
        <Layout style={{height: "100%"}} className={"!flex !flex-row"}>
          <Sidebar/>
          <Layout.Content>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}