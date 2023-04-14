import { Button, Checkbox, Form, Input, Spin } from "antd";
import PagesHeader from "../components/header/Pageheader";
import axios from "axios";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Alert } from "antd";
function AddTerritory() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        color: "white",
      }}
      spin
    />
  );

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("https://api.zciea.trade/addterritory", values)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMessage("Territory added successfully");
        setMessageType("success");
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
      <PagesHeader title="Add Territory" subTitle="Add new territory" />
      <Alert message={message} type={messageType} />
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <Spin indicator={antIcon} style={{ color: "green" }} />
        </div>
      ) : (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Territory"
            name="territory"
            rules={[
              {
                required: true,
                message: "Please input territory name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="success" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
export default AddTerritory;
