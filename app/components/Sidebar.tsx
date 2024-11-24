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

interface MenuElement {
  key: string,
  icon: React.JSX.Element,
  label: React.JSX.Element
}

export default function Sidebar({selected} : {selected: string}) {
  const menuItems: MenuElement[] = [
    {key: 'activity_logging', icon: <FormOutlined/>, label: <Link href={"/dashboard/activity_logging"}>Activity logging</Link>},
    {key: 'nutrition', icon: <FieldTimeOutlined/>, label: <Link href={"/dashboard/nutrition"}>Nutrition tracker</Link>},
    {key: 'integration', icon: <DesktopOutlined/>, label: <Link href={"/dashboard/integration"}>Integrate devices</Link>},
    {key: 'share', icon: <ShareAltOutlined/>, label: <Link href={"/dashboard/share"}>Share progress</Link>},
    {key: 'workout', icon: <ProductOutlined/>, label: <Link href={"/dashboard/workout"}>Workout Plan</Link>},
  ];

  const { token: {colorBgContainer} } = theme.useToken();

  let siderStyle: React.CSSProperties = {
    background: colorBgContainer,
    position: "fixed",
    width: 200,
    height: "100%"
  };

  let selectedMenu: MenuElement[]
    = menuItems.filter(item => item.key === selected);
  if (selectedMenu.length === 0) {
    selected = menuItems[0].key
  }
  const [openMenu] = useState<string>(selected);
  return (
    <Layout.Sider style={siderStyle}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[openMenu]}
        style={{height: '100%', borderRight: 0, marginTop: 64}}
        items={menuItems}
      />
    </Layout.Sider>
  )
}