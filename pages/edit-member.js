import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
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
import {
  UploadOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import PagesHeader from "../components/header/Pageheader";
import axios from "axios";
import Image from "next/image";

const _URL = "https://api.zciea.trade/uploads/";

const style = {
  objectFit: "contain!important",
};
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 64,
      color: "white",
    }}
    spin
  />
);

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

function EditMember() {
  const router = useRouter();
  const id = router.query.userid;
  const [member, setMember] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [territories, setTerritories] = useState([]);
  const [image, setImage] = useState();
  const [editImage, setEditImage] = useState(false);
  const [imageAvailable, setImageAvailable] = useState(true);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        color: "white",
      }}
      spin
    />
  );
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

  const handleEditClick = () => {
    console.log(editImage);
    setEditImage(true);
  };
  const onFinish = (values) => {
    setIsLoading(true);
    let formdata = new FormData();
    Object.entries(values).forEach(([key, value]) =>
      formdata.append(key, value)
    );

    if (image) {
      formdata.delete("image");
      formdata.append("myFile", image[0]?.originFileObj);
    } else {
      formdata.append("myFile", member?.image);
    }
    formdata.append("id", member?.id);

    console.log("Received values of form: ", image);

    axios({
      method: "post",
      url: "https://api.zciea.trade/editmember",
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
  const normFile = (e) => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setImage(e?.fileList);

    return e?.fileList;
  };
  useEffect(() => {
    getTerritories();
  }, []);

  useEffect(() => {
    fetch("https://api.zciea.trade/user", {
      method: "POST",
      body: JSON.stringify({
        userid: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMember(data?.results?.[0]);
        console.log("MEMBAH", data?.results?.[0]);
        data?.results[0]?.image == null || data?.results[0]?.image === ""
          ? setImageAvailable(false)
          : setImageAvailable(true);
        setImageUrl(data?.results[0]?.image);
        setIsLoading(false);
        console.error("Error:", isLoading);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        <Alert message={error} type="error" />;
      });
  }, []);

  useEffect(() => {
    console.log("State haus", editImage);
  }, [editImage]);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
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
          initialValue={member?.name}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ID Number"
          name="id_number"
          rules={[{ required: true, message: "Value cannot be empty" }]}
          initialValue={member?.id_number}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Disablity"
          name="disability"
          rules={[{ required: true, message: "Value cannot be empty" }]}
          initialValue={member?.disability}
        >
          <Select>
            <Select.Option value={1}>Yes</Select.Option>
            <Select.Option value={0}>No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          initialValue={member?.address}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Date of Birth" name="date_of_birth">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Territory"
          name="territory"
          initialValue={member?.territory}
        >
          <Select>
            {territories.map((territory, index) => (
              <Select.Option key={index} value={territory.name}>
                {territory.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Gender" name="gender" initialValue={member?.gender}>
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Trade"
          name="trade"
          initialValue={member?.trade}
          //rules={[{ required: true, message: "Value cannot be empty" }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Contact"
          name="contact"
          initialValue={member?.contact}
          rules={[{ required: true, message: "Value cannot be empty" }]}
        >
          <InputNumber
            addonBefore={
              <select
                style={{
                  width: 70,
                }}
              >
                <option value="263">+263</option>
                <option value="27">+27</option>
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
          initialValue={member?.amount_paid}
          //rules={[{ required: true, message: "Value cannot be empty" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          initialValue={member?.email}
          //rules={[{ required: true, message: "Value cannot be empty" }]}
        >
          <Input type="email" />
        </Form.Item>
        {editImage || !imageAvailable ? (
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
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "2em 16em",
              alignItems: "start",
            }}
          >
            <h3>Edit Image</h3>
            <EditOutlined
              style={{
                fontSize: 34,
                color: "black",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            />
            <Image
              width={200}
              height={200}
              fill
              src={`${_URL}${imageUrl}`}
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              alt="Picture"
              placeholder="blur"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        {/* {member?.image !== null || member?.image !== "" ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "2em 16em",
                alignItems: "start",
              }}
            >
              <h3>Edit Image</h3>
              <EditOutlined
                style={{
                  fontSize: 34,
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={handleEditClick}
              />
              <Image
                width={200}
                height={200}
                fill
                src={`${_URL}${imageUrl}`}
                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                alt="Picture"
                placeholder="blur"
                style={{ objectFit: "contain" }}
              />
            </div>
          </>
        ) : (
          <>
            <Form.Item
              name="image"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please attach an image" }]}
            >
              <Upload
                name="image"
                listType="picture"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </>
        )} */}

        <Form.Item label=" ">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update Member
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default EditMember;
