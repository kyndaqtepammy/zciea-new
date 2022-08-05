
import { DeleteOutlined, EditOutlined, MailOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Space } from "antd";
import PagesHeader from "../../components/header/Pageheader";
import { useState } from "react";
import Link from "next/link";

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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trade',
            dataIndex: 'trade',
            key: 'trade',
        },
        {
            title: 'Territory',
            dataIndex: 'territory',
            key: 'territory',
        },
        {
            title: 'Age',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            render: dob => (
                <p>{getAge(dob)}</p>
            ),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Link href={`/member?userid=${record.id}`}><a><EyeOutlined/></a></Link>
                <a><EditOutlined/></a>
                <a><DeleteOutlined/></a>
                <a><MailOutlined/></a>
              </Space>
            ),
          },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

      const [selectionType, setSelectionType] = useState('checkbox');

    return (

        <div className="site-card-wrapper">
            <div>
                <PagesHeader title="View Members" subTitle="All members" />
                <div className="site-card-wrapper">
                    <Table dataSource={members.members.members} columns={columns}  />;

                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://api.zciea.trade/api/reports')
    const members = await res.json()

    return {
        props: {
            members,
        },
    }
}