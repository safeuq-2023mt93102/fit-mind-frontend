'use client'
import Logout from "@/app/components/Logout";

import {InputNumber, Table, Tag, Layout, Menu, Typography, Flex, theme} from 'antd';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


export default function Navbar({username}) {

  return (
    <Layout.Header>
      <Flex style={{height: "100%"}} align={"center"}>
        <Typography.Title level={4} style={{color: 'white', margin: 0}}>Fitness Tracker</Typography.Title>
        <div style={{flexGrow: 1}}></div>
        <Typography.Text style={{color: "white", marginRight: "20px"}}>Welcome, {username}</Typography.Text>
        <Logout/>
      </Flex>
    </Layout.Header>
  )
}