import { Layout, Button, Checkbox, Form, Input, Card, Avatar, Alert, Typography, Spin } from "antd";
const { Content } = Layout;
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import logo from '../public/img/logo.png';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
const { Title } = Typography;
const failed = "failed";
const success = "success"

export default function Home() {
	const [loginSuccess, setLoginSucess] = useState(null);
	const [responseMessage, setResponseMessage] = useState();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 64,
				color: "white"
			}}
			spin
		/>
	);

	const onFinish = async (values) => {
		setLoading(true);
		console.log("Success:", values);
		axios.post('https://api.zciea.trade/api/login', {
			email: values.email,
			password: values.password
		})
			.then(function (response) {
				setLoading(false)
				console.log("response", response.data);
				setResponseMessage(response.data.message);
				if (response.data.code !== 200) { setLoginSucess(failed) }
				if (response.data.error === null && response.data.token) { setLoginSucess(success); router.push("/dashboard") }
			})
			.catch(function (error) {
				setLoading(false)
				console.log(error);
				setResponseMessage(error);
				setLoginSucess(failed);
			});
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
					{loading ? <div style={{ textAlign: "center" }}><Spin indicator={antIcon} /></div> : <Content>
						{
							loginSuccess === success && <Alert
								message="Success"
								description={responseMessage}
								type="success"
								showIcon
							/>
						}
						{
							loginSuccess === failed &&
							<Alert
								message="Error"
								description={responseMessage}
								type="error"
								showIcon
							/>
						}
						<Card style={{
							width: 400, margin: "auto", display: "block", marginTop: "10vh",
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
									name="email"
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
					</Content>}
				</Layout>
			</Layout>
		</>
	);
}
