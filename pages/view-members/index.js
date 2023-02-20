import {
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Table, Space, Input } from "antd";
import PagesHeader from "../../components/header/Pageheader";
import { useEffect, useState } from "react";
import Link from "next/link";
//const { Search } = Input;

export default function ViewMembers(members) {
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [data, setData] = useState();
  const [dataSource, setDataSource] = useState(members?.members?.members);
  const [value, setValue] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.zciea.trade/reports")
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        setData(data.members);
        setDataSource(data?.members);
        console.log("membz", data?.members);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });
  }, [data]);

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        const pattern = RegExp(currValue, "gi");
        setValue(currValue);
        const filteredData = data.filter((entry) =>
          entry.name.toLowerCase().includes(currValue.toLowerCase())
        );
        setDataSource(filteredData);
      }}
    />
  );
  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trade",
      dataIndex: "trade",
      key: "trade",
    },
    {
      title: "Territory",
      dataIndex: "territory",
      key: "territory",
    },
    // {
    //   title: "Age",
    //   dataIndex: "date_of_birth",
    //   key: "date_of_birth",
    //   render: (dob) => <p>{getAge(dob)}</p>,
    // },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/member?userid=${record.id}`}>
            <a>
              <EyeOutlined />
            </a>
          </Link>
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
          <a>
            <MailOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="site-card-wrapper">
      <div>
        <PagesHeader title="View Members" subTitle="All members" />
        <div className="site-card-wrapper">
          <Table dataSource={dataSource?.slice().reverse()} columns={columns} />
          ;
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://api.zciea.trade/reports");
//   const members = await res.json();

//   return {
//     props: {
//       members,
//     },
//   };
// }
