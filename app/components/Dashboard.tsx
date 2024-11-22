"use client"
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import type {MenuProps} from 'antd';
import {InputNumber, Table, Tag, Layout, Menu, theme} from 'antd';

import LogActivity from "@/app/components/LogActivity";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import {Session} from "next-auth";
import {SessionProvider, signOut, useSession} from "next-auth/react";
import NutritionTracker from "@/app/components/NutritionTracker";

const {Header, Sider, Content} = Layout;
const {Title} = Typography;
const {Text} = Typography;

type MenuItem = Required<MenuProps>['items'][number];

export default function Dashboard(session: {session: Session | null}) {
  // const {
  //   token: {colorBgContainer, borderRadiusLG},
  // } = theme.useToken();
  console.log("Homepage session: ", session)
  return (
    <>
      <SessionProvider session={session}>
        <Layout style={{height: "100%"}}>
          <Navbar/>
          <BrowserRouter basename="/dashboard">
            <Layout style={{height: "100%"}}>
              <Sidebar/>
              <Layout.Content>
                <Routes>
                  <Route path="/" element={<LogActivity/>} />
                  <Route path="log" element={<LogActivity/>} />
                  <Route path="nutrition" element={<NutritionTracker/>} />
                </Routes>
              </Layout.Content>
            </Layout>
          </BrowserRouter>
        </Layout>
      </SessionProvider>
    </>
  )
}