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
import Link from "next/link";


const Sidebar = () => {
  const menuItems = [
    {key: 'logActivity', icon: <FormOutlined/>, label: <Link href={"/"}>Activity logging</Link>},
    {key: '2', icon: <FieldTimeOutlined/>, label: <Link href={"/nutrition"}>Nutrition tracker</Link>},
    {key: '3', icon: <DesktopOutlined/>, label: <Link href={"/integration"}>Integrate devices</Link>},
    {key: '4', icon: <ShareAltOutlined/>, label: <Link href={"/share"}>Share progress</Link>},
    {key: '5', icon: <ProductOutlined/>, label: <Link href={"/workout"}>Workout Plan</Link>},
  ];
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const [openMenu, setOpenMenu] = useState<string>(menuItems[0].key);
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
export default Sidebar;