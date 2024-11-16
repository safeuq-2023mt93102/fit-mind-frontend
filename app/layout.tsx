import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import Navbar from "@/app/components/Navbar";
import {Layout, Flex} from 'antd'
import Sidebar from "@/app/components/Sidebar";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export default async function RootLayout(
  {children}: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth()

  return (
    <html lang="en">
      <body style={{height: "100vh"}} className={inter.className}>
        <AntdRegistry>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
