import { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table } from "antd";
import PagesHeader from "../../components/header/Pageheader";
import moment from "moment";

export default function AllUsers() {
  const [users, setUsers] = useState();
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Surname",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      render: (dob) => <p>{moment(dob).format("D MMMM YYYY")}</p>,
    },
  ];
  useEffect(() => {
    axios
      .get("https://api.zciea.trade/systemusers")
      .then((res) => {
        setUsers(res?.data?.members);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="site-card-wrapper">
      <div>
        <PagesHeader title="System Users" subTitle="All users" />
        <div className="site-card-wrapper">
          <Table dataSource={users} columns={columns} />
        </div>
      </div>
    </div>
  );
}
