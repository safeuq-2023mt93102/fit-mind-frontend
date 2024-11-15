"use client"
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ShareAltOutlined,
  FieldTimeOutlined,
  FormOutlined,
  ProductOutlined
} from '@ant-design/icons';
import {Button, Modal, Input, Select, Flex, Typography} from 'antd';
import type {MenuProps} from 'antd';
import {InputNumber, Table, Tag, Layout, Menu, theme} from 'antd';

import Logout from "@/app/components/Logout";
import LogActivity from "@/app/components/LogActivity";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import NutritionTracker from "@/app/components/NutritionTracker";
import {useRouter} from "next/navigation";
import {Router} from "next/router";

const {Header, Sider, Content} = Layout;
const {Title} = Typography;
const {Text} = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function HomePage({session}:{session: Session}) {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);


  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Handle route change if needed
      console.log("Navigating to: ", url);
      setCurrentPath(url);
    };

    Router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  console.log("Router path: ", currentPath);
  console.log("Homepage session: ", session)
  return (
    <>
      <SessionProvider session={session}>
        <Layout style={{height: "100%"}}>
          <Navbar/>
          <BrowserRouter basename="/">
          <Layout style={{height: "100%"}}>
            <Sidebar/>
            <Layout.Content>
                <Routes>
                  <Route path="/" element={<LogActivity />} />
                  <Route path="nutrition" element={<NutritionTracker />} />
                </Routes>
              {/*{(currentPath === "/" || currentPath === undefined) && <LogActivity />}*/}
              {/*{currentPath === "/nutrition" && <NutritionTracker />}*/}
            </Layout.Content>
          </Layout>
          </BrowserRouter>
        </Layout>
      </SessionProvider>
    </>
  )
}

export default HomePage;