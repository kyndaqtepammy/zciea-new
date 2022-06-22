import React from "react";
import PagesHeader from "../../components/header/Pageheader";
import { Avatar, Card, Col, Row } from "antd";
import {
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
	FileMarkdownOutlined,
	EyeOutlined,
	CalendarOutlined,
	GlobalOutlined,
	CheckSquareOutlined,
	CloseSquareOutlined,
	AreaChartOutlined,
	DownSquareOutlined,
	MailOutlined,
} from "@ant-design/icons";
import Link from "next/link";

function Dashboard() {
	const cards = [
		{
			title: "View Members",
			link: "/members",
			icon: <UserOutlined size={64} color="#22af47" />,
		},
		{
			title: "New Member",
			link: "/addmember",
			icon: <UserAddOutlined size={64} color="#22af47" />,
		},
		{
			title: "Territories",
			link: "/territories",
			icon: <GlobalOutlined size={64} color="#22af47" />,
		},
		{
			title: "Active Members",
			link: "/active",
			icon: <CheckSquareOutlined size={64} color="#22af47" />,
		},
		{
			title: "Inactive Members",
			link: "/inactive",
			icon: <CloseSquareOutlined size={64} color="#22af47" />,
		},
		{
			title: "Reports",
			link: "/reports",
			icon: <AreaChartOutlined size={64} color="#22af47" />,
		},
		{
			title: "Settings",
			link: "/settings",
			icon: <SettingOutlined size={64} color="#22af47" />,
		},
		{
			title: "Events",
			link: "/events",
			icon: <CalendarOutlined size={64} color="#22af47" />,
		},
		{
			title: "Import",
			link: "/import",
			icon: <DownSquareOutlined size={64} color="#22af47" />,
		},
		{
			title: "Targeted SMS",
			link: "/targeted-sms",
			icon: <MailOutlined size={64} color="#22af47" />,
		},
	];
	return (
		<div>
			<PagesHeader title="Dashboard" subTitle="Welcome to the dashboard" />
			<div className="site-card-wrapper">
				<Row gutter={16}>
					{cards.map((card, index) => {
						return (
							<Col span={8} key={index}>
								<Link href={card.link}>
									<a>
										<Card
											title={card.title}
											bordered={true}
											size="small"
											style={{ textAlign: "center", margin: "0.5em 0.5em" }}>
											<p>
												<Avatar
													size={64}
													icon={card.icon}
													style={{
														backgroundColor: "#87d068",
													}}
												/>
											</p>
										</Card>
									</a>
								</Link>
							</Col>
						);
					})}
				</Row>
			</div>
		</div>
	);
}

export default Dashboard;
