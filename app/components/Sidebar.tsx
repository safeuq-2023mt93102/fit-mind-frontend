"use client"
import {Layout, Menu, theme} from 'antd'
import React, {useState} from "react";
import {
  DesktopOutlined,
  ShareAltOutlined,
  FieldTimeOutlined,
  FormOutlined,
  ProductOutlined
} from '@ant-design/icons';
// import {Link} from "react-router-dom";
import Link from "next/link";


export default function Sidebar() {
  const menuItems = [
    {key: 'activity_logging', icon: <FormOutlined/>, label: <Link href={"/dashboard/activity_logging"}>Activity logging</Link>},
    {key: 'nutrition', icon: <FieldTimeOutlined/>, label: <Link href={"/dashboard/nutrition"}>Nutrition tracker</Link>},
    {key: 'integration', icon: <DesktopOutlined/>, label: <Link href={"/dashboard/integration"}>Integrate devices</Link>},
    {key: 'share', icon: <ShareAltOutlined/>, label: <Link href={"/dashboard/share"}>Share progress</Link>},
    {key: 'workout', icon: <ProductOutlined/>, label: <Link href={"/dashboard/workout"}>Workout Plan</Link>},
  ];
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const [openMenu] = useState<string>(menuItems[0].key);
  return (
    <Layout.Sider width={200} style={{background: colorBgContainer}}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[openMenu]}
        style={{height: '100%', borderRight: 0}}
        items={menuItems}
      />
    </Layout.Sider>
  )
}