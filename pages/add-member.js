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
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import PagesHeader from "../components/header/Pageheader";
import axios from "axios";

export default function AddMember() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [territories, setTerritories] = useState([]);
  const [image, setImage] = useState();
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        color: "white",
      }}
      spin
    />
  );

  const selectBefore = (
    <Select
      defaultValue="263"
      style={{
        width: 60,
      }}
    >
      <Option value="263">263</Option>
      <Option value="27">27</Option>
    </Select>
  );

  const normFile = (e) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setImage(e?.fileList);

    return e?.fileList;
  };

  const getTerritories = () => {
    axios
      .get("https://api.zciea.trade/territories")
      .then((res) => {
        // console.log(res.data.members);
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
    setLoading(true);
    let formdata = new FormData();
    var dateString = values.date_of_birth._d;
    var date = new Date(Date.parse(dateString));
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hour = ("0" + date.getHours()).slice(-2);
    var minute = ("0" + date.getMinutes()).slice(-2);
    var second = ("0" + date.getSeconds()).slice(-2);
    var datetimeString =
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    Object.entries(values).forEach(([key, value]) =>
      formdata.append(key, value)
    );
    formdata.delete("image");
    formdata.delete("date_of_birth");
    formdata.append("myFile", image[0].originFileObj);
    formdata.append("date_of_birth", datetimeString);

    for (const pair of formdata.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    axios({
      method: "post",
      url: "https://api.zciea.trade/test",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("RESULTS", res);
        setLoading(false);
        if (!res?.data?.error) {
          setMessage(
            "Member Added successfully. Please wait while you are being redirected."
          );
          setMessageType("success");
          window.location.replace("/view-members");
        } else {
          setMessage(res?.data?.success);
          setMessageType("warning");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error adding new member", err);
        setMessage("Something went wrong!");
        setMessageType("error");
      });
  };

  return (
    <>
      <PagesHeader title="Add Member" subTitle="Add new members" />

      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <Spin indicator={antIcon} style={{ color: "green" }} />
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
          <Alert message={message} type={messageType} />

          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ID Number"
            name="id_number"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Disablity"
            name="disability"
            rules={[{ required: true, message: "Value cannot be empty" }]}
          >
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
              addonBefore={
                <select
                  defaultValue="263"
                  style={{
                    width: 60,
                  }}
                >
                  <option value="263">263</option>
                  <option value="27">27</option>
                </select>
              }
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
