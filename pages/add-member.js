import { useEffect, useState } from "react";
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
  Option,
  Alert,
  Spin,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PagesHeader from "../components/header/Pageheader";
import axios from "axios";

export default function AddMember() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [territories, setTerritories] = useState([]);
  const [image, setImage] = useState()

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="263">+263</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setImage(e?.fileList)
    
    return e?.fileList;
  };

  const getTerritories = () => {
    axios
      .get("https://api.zciea.trade/territories")
      .then((res) => {
        console.log(res.data.members);
        setTerritories(res?.data?.members);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTerritories();
  }, []);
  const onFinish = (values) => {
      console.log("Received values of form: ", image[0].originFileObj);
     let formdata = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formdata.append(key, value)
    );
    formdata.delete("image");
    formdata.append("myFile", image[0].originFileObj);

    for (const pair of formdata.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    axios
      .post("https://www.api.zciea.trade/api/uploads/", formdata)
      .then((res) => {
        console.log(res?.data);
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
      <PagesHeader title="Add Member" subTitle="Add new members" />
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
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="ID Number"
            name="id_number"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Disablity" name="disability"
          rules={[{ required: true, message: "Value cannot be empty" }]}>
            <Select>
              <Select.Option value={1}>Yes</Select.Option>
              <Select.Option value={0}>No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Date of Birth" name="date_of_birth">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Territory" name="territory">
            <Select>
              {territories.map((territory, index) => (
                <Select.Option key={index} value={territory.name}>
                  {territory.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Trade"
            name="trade"
            //rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <InputNumber
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Amount Paid"
            name="amount_paid"
            //rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            //rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please attach an image" }]}
          >
            <Upload name="image" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create Member
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://api.zciea.trade/territories");
  const territories = await res.json();

  return {
    props: {
      territories,
    },
  };
}
