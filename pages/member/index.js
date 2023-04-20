import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Descriptions } from "antd";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import bgimg from "../../public/img/zciea.png";
import Image from "next/image";
import { Button, Spin } from "antd";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../public/img/logo.png";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
const _URL = "https://api.zciea.trade/uploads/";

const style = {
  objectFit: "contain!important",
};

function Member() {
  const router = useRouter();
  const id = router.query.userid;
  const [member, setMember] = useState();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 64,
        color: "white",
      }}
      spin
    />
  );

  const issueRef = useRef();
  const expRef = useRef();

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
        setMember(data);
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
  const updateInfo = () => {
    let formdata = new FormData();
    Object.entries(member?.results[0]).forEach(([key, value]) =>
      formdata.append(key, value)
    );
    formdata.delete("subscription_date");
    formdata.delete("expiry_date");
    formdata.append("subscription_date", issueRef.current.value);
    formdata.append("expiry_date", expRef.current.value);
    for (const pair of formdata.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    console.log("After print do this", issueRef.current.value);
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
          //window.location.replace("/view-members");
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
      <div>
        <ReactToPrint
          onAfterPrint={updateInfo}
          trigger={() => (
            <Button
              type="success"
              size="large"
              style={{ marginBottom: "2em", width: "-wekit-fill-available" }}
            >
              Save and Print ID
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle="@page { size: 3.375in 2.125in }"
        />
        <div ref={componentRef}>
          <section
            className="FlexContainer"
            style={{
              backgroundImage: `url(${bgimg.src})`,
              backgroundSize: "cover",
              marginLeft: "14em",
            }}
          >
            <div
              id="id-img-div"
              style={{ marginLeft: "4em", marginTop: "7em", width: "auto" }}
            >
              <div style={{ border: "3px solid grey", marginTop: "6em" }}>
                <Image
                  width={400}
                  height={400}
                  fill
                  src={`${_URL}${imageUrl}`}
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  alt="Picture"
                  placeholder="blur"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <QRCodeSVG
                value={`https://zciea-new.vercel.app/member_id/?userid=${member?.results[0]?.id}`}
                style={{ marginTop: "1em", width: "100px" }}
              />
            </div>

            <div id="id-details-div">
              <span>
                <h4>Name: {member?.results[0]?.name.split(" ")[0]}</h4>
              </span>
              <span>
                <h4>Surname: {member?.results[0]?.name.split(" ")[1]}</h4>
              </span>
              <span>
                <h4>ID Number: {member?.results[0]?.id_number}</h4>
              </span>
              <span>
                <h4>Territorry: {member?.results[0]?.territory}</h4>
              </span>
              <span>
                <h4>Gender: {member?.results[0]?.gender}</h4>
              </span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  width: "7em",
                }}
              >
                <label style={{ fontWeight: 900 }}>Date of issue:</label>
                <input
                  ref={issueRef}
                  type="text"
                  style={{
                    border: "none",
                    fontSize: "large",
                    width: "7em",
                    fontWeight: "900",
                    paddingLeft: "0.5em",
                  }}
                />
              </span>
              <br />
              <span style={{ whiteSpace: "nowrap" }}>
                <label style={{ fontWeight: 900 }}>Expiry Date:</label>
                <input
                  ref={expRef}
                  type="text"
                  style={{
                    border: "none",
                    fontSize: "large",
                    width: "7em",
                    fontWeight: "900",
                    paddingLeft: "0.75em",
                  }}
                />
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Member;
