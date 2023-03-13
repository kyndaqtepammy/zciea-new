import { Descriptions } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Image } from "next/image";
import { LoadingOutlined } from "@ant-design/icons";
import Alert from "antd";
export default function MemberId() {
  const router = useRouter();
  const id = router.query.userid;
  const [member, setMember] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const _URL = "https://api.zciea.trade/uploads/";
  <LoadingOutlined
    style={{
      fontSize: 64,
      color: "white",
    }}
    spin
  />;

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
        setImageUrl(data?.results?.[0]?.image);
        setIsLoading(false);
        console.log("mesej:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
        <Alert message={error} type="error" />;
      });
  }, []);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      Loading...
    </div>
  ) : (
    <div className="site-card-wrapper">
      <Descriptions title="User Info" colon column={1} size="medium">
        <div>
          <img
            src={`${_URL}${member?.image}`}
            style={{
              border: "3px solid grey",
              marginTop: "2em",
              width: "200px",
            }}
            alt="Image of member"
          />
        </div>
        <Descriptions.Item label="Name" labelStyle={{ fontWeight: 700 }}>
          {member?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Territory" labelStyle={{ fontWeight: 700 }}>
          {member?.territory}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" labelStyle={{ fontWeight: 700 }}>
          {member?.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Amount paid" labelStyle={{ fontWeight: 700 }}>
          {member?.amount}
        </Descriptions.Item>
        <Descriptions.Item label="Address" labelStyle={{ fontWeight: 700 }}>
          {member?.address}
        </Descriptions.Item>
        <Descriptions.Item
          label="Phone Number"
          labelStyle={{ fontWeight: 700 }}
        >
          {member?.contact}
        </Descriptions.Item>
        <Descriptions.Item label="Email" labelStyle={{ fontWeight: 700 }}>
          {member?.email}
        </Descriptions.Item>
        <Descriptions.Item label="ID Number" labelStyle={{ fontWeight: 700 }}>
          {member?.id_number}
        </Descriptions.Item>
        <Descriptions.Item label="Trade" labelStyle={{ fontWeight: 700 }}>
          {member?.trade}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
