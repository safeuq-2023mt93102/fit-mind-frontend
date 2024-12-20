'use client'
import Logout from "@/app/components/Logout";
import Login from "@/app/components/Login";

import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import {InputNumber, Table, Tag, Layout, Menu, theme} from 'antd';
import {useSession, SessionProvider} from "next-auth/react";
const {Header, Sider, Content} = Layout;
const {Title} = Typography;
const {Text} = Typography;

export default function Navbar() {
  const session = useSession()

  return (
    <SessionProvider>
      <Header style={{padding: "0 20px 0 20px", position: "fixed", top: 0, zIndex: 1, width: "100%", height: "64px"}}>
        <Flex style={{height: "100%"}} align={"center"}>
          <Title level={4} style={{color: "white", margin: 0}}>Fit Mind</Title>
          <div style={{flexGrow: 1}}></div>
          {
            session.status === "authenticated" ?
              (<>
                <Text style={{color: "white", marginRight: "20px"}}>Welcome, {session?.data?.user?.name}</Text>
                <Logout/>
              </>)
              : (
                <>
                  <Button type="link" href={"/auth/signup"}>
                    Sign-up
                  </Button>
                <Login/>
                </>
              )
          }
        </Flex>
      </Header>
    </SessionProvider>
  )
}