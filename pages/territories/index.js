import { Layout, Divider, List, Typography } from "antd";
import React, { useEffect, useState } from "react";
import PagesHeader from "../../components/header/Pageheader";
import { Table, Space } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function Territories(territories) {
  const [dataTerritories, setDataTerritories] = useState([]);
  let dataArray = [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  useEffect(() => {
    // console.log(info);
    // info?.forEach((e) => {
    //   dataArray.push(e?.name);
    // });
    const info = territories?.territories?.members;

    setDataTerritories(info);
  }, [dataArray]);
  return (
    <Layout>
      {console.log("rwerwty", dataTerritories)}

      <Content>
        <PagesHeader title="View Members" subTitle="All Territories" />
        <div className="site-card-wrapper">
          <Table dataSource={dataTerritories} columns={columns} />
        </div>
      </Content>
    </Layout>
  );
}

export default Territories;

export async function getStaticProps() {
  const res = await fetch("https://api.zciea.trade/territories");
  const territories = await res.json();

  return {
    props: {
      territories,
    },
  };
}
