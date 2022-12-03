import React from "react";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  AreaChartOutlined,
  ProfileOutlined,
  LogoutOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;
import { Button, Menu } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function Sidebar(pageProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout theme="light">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <Image width={100} height={100} src="/img/logo.png" />
        </div>
        <Menu
          theme="light"
          style={{
            height: "100vh",
            color: "grey",
            boxShadow: "15px 0px 15px -10px rgba(0,0,0,0.25)",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/users",
              icon: <UserOutlined />,
              label: "Users",
              children: [
                { label: "Add Users", key: "/add-users" },
                { label: "All Users", key: "/all-users" },
              ],
            },
            {
              key: "/members",
              icon: <UsergroupAddOutlined />,
              label: "Members",
              children: [
                { label: "View Members", key: "/view-members" },
                { label: "Add Member", key: "/add-member" },
              ],
            },
            {
              icon: <HeatMapOutlined />,
              label: "Territories",
              children: [{ label: "All Territories", key: "/territories" }],
            },
            {
              key: "/reports",
              icon: <AreaChartOutlined />,
              label: "Reports",
            },
            {
              key: "/profile",
              icon: <ProfileOutlined />,
              label: "Profile",
            },
            {
              key: "/",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
          onClick={(e) => {
            // console.log(e);
            router.push(e.key);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          theme="light"
          className="site-layout-background"
          style={{
            paddingLeft: 10,
            backgroundColor: "#22af47",
            color: "white",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <a style={{ color: "white", fontSize: "1.2em", paddingLeft: "2em" }}>
            ZIMBABWE CHAMBER OF INFORMAL ECONOMY ASSOCIATIONS
          </a>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            minHeight: "100vh",
          }}
        >
          {pageProps.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
