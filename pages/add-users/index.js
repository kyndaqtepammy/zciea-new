import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Alert,
  Spin,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import PagesHeader from "../../components/header/Pageheader";

function Users() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    //console.log("Received values of form: ", values);
    axios
      .post("https://api.zciea.trade/register", values)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res?.data?.token) {
          setMessage("User Added successfully");
          setMessageType("success");
          window.location.replace("/");
        } else {
          setMessage(res?.data?.success);
          setMessageType("warning");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setMessage("Something went wrong!");
        setMessageType("error");
      });
  };
  return (
    <>
      <PagesHeader title="Users" subTitle="All system users" />
      <Alert message={message} type={messageType} />
      {loading ? (
        <div
          className="site-card-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Spin />
        </div>
      ) : (
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          colon={false}
          onFinish={onFinish}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item label="User Role" name="role">
            <Select>
              <Select.Option value="1">Full Admin Access</Select.Option>
              <Select.Option value="2">Restricted Access</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create User
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default Users;
