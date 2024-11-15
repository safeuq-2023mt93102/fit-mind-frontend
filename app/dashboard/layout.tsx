"use client"
import {Inter} from "next/font/google";
import Navbar from "@/app/components/Navbar";
import {Layout, Flex} from 'antd'
import Sidebar from "@/app/components/Sidebar";

const inter = Inter({subsets: ["latin"]});

export default function DashboardLayout(
  {children}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <Flex style={{height: "100%"}} wrap>
      <Layout>
        <Navbar/>
        <Sidebar/>
        {children}
      </Layout>
    </Flex>
  );
}
