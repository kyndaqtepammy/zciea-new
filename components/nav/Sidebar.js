import React from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;
import { Button, Menu } from "antd";
import { useState } from "react";
import { useRouter } from 'next/router';

function Sidebar(pageProps) {
	const [collapsed, setCollapsed] = useState(false);
const router = useRouter();
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Layout theme="light">
			<Sider trigger={null} collapsible collapsed={collapsed} theme="light">
				<div className="logo" />
				<Menu
                
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={[
						{
							key: "/dashboard",
							icon: <UserOutlined />,
							label: "Dashboard",
						},
						{
							key: "/users",
							icon: <VideoCameraOutlined />,
							label: "Users",
						},
						{
							key: "/members",
							icon: <UploadOutlined />,
							label: "Members",
						},
                        {
							key: "/territories",
							icon: <UploadOutlined />,
							label: "Territories",
						},
                        {
							key: "/reports",
							icon: <UploadOutlined />,
							label: "Reports",
						},
                        {
							key: "/profile",
							icon: <UploadOutlined />,
							label: "Profile",
						},
                        {
							key: "/",
							icon: <UploadOutlined />,
							label: "Logout",
						},
					]}
                    onClick={(e)=>{
                        console.log(e)
                        router.push(e.key)
                    }}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
                theme="light"
					className="site-layout-background"
					style={{
						padding: 0,
                        backgroundColor: "white"
					}}>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined: MenuFoldOutlined ,
						{
							className: "trigger",
							onClick: () => setCollapsed(!collapsed),
						}
					)}
				</Header>
				<Content
					className="site-layout-background"
					style={{
						minHeight: "100vh",
					}}>
					{pageProps.children}
				</Content>
			</Layout>
		</Layout>
	);
}

export default Sidebar;
