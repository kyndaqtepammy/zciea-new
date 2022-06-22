import { Layout, Button, Checkbox, Form, Input, Card, Avatar } from "antd";
const { Content } = Layout;
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from 'antd';
import logo from '../public/img/logo.png';
const { Title } = Typography;

export default function Home() {
	const onFinish = (values) => {
		//console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Layout>
				<Layout
					style={{
						height: "100vh",
						width: "100vw",
						textAlign: "center",
						margin: "auto",
						display: "grid",
						justifyItems: "center",
						backgroundColor: "#22af47",
					}}>
					<Content>
						<Card style={{ width: 400, margin: "auto", display:"block",marginTop: "10vh",
}}>
  <Avatar size={84} src={logo.src} shape="square" />
  <Title level={2}>Sign in</Title>
							<Form
								name="normal_login"
								className="login-form"
								initialValues={{
									remember: true,
								}}
								onFinish={onFinish}>
								<Form.Item
									name="username"
									rules={[
										{
											required: true,
											message: "Please input your Username!",
										},
									]}>
									<Input
										prefix={<UserOutlined className="site-form-item-icon" />}
										placeholder="Username"
									/>
								</Form.Item>
								<Form.Item
									name="password"
									rules={[
										{
											required: true,
											message: "Please input your Password!",
										},
									]}>
									<Input
										prefix={<LockOutlined className="site-form-item-icon" />}
										type="password"
										placeholder="Password"
									/>
								</Form.Item>
								<Form.Item>
									<Form.Item name="remember" valuePropName="checked" noStyle>
										<Checkbox>Remember me</Checkbox>
									</Form.Item>

									<a className="login-form-forgot" href="">
										Forgot password
									</a>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button">
										Log in
									</Button>
									Or <a href="">register now!</a>
								</Form.Item>
							</Form>
						</Card>
					</Content>
				</Layout>
			</Layout>
		</>
	);
}
