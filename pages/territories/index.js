import { Layout, Divider, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import PagesHeader from "../../components/header/Pageheader";

const { Header, Content, Footer, Sider } = Layout;


function Territories(territories) {
    const info = territories?.territories?.members;
    let dataArray = [];

    useEffect(() => {
        info?.forEach(e => {
            dataArray.push(e?.name)
        })
    }, [dataArray]);
    return (

        <Layout>
            {console.log("rwerwty", dataArray)}

            <Content>
                <PagesHeader title="View Members" subTitle="All Territories" />
                <List
                    size="large"
                    header={<div>All Territories</div>}
                    bordered
                    dataSource={dataArray}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </Content>
        </Layout>
    );
}

export default Territories;

export async function getStaticProps() {
    const res = await fetch('https://api.zciea.trade/api/territories')
    const territories = await res.json()

    return {
        props: {
            territories,
        },
    }
}