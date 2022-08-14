import PagesHeader from "../../components/header/Pageheader";
const { Header, Content, Footer, Sider } = Layout;
import { Layout, Divider, List, Typography, Skeleton } from 'antd';
import Link from "next/link";

function Reports() {
    const data = [
        { text: "Active and inactive members by territory", key: "/active-inactive" },
        { text: "Gender Analysis by age", key: "/by-age" },
        { text: "Gender clasification by territory", key: "/gender-territory" },
        { text: "Member trade information", key: "/trade-information" },
        { text: "Members by territory", key: "/members-territory" },
        { text: "Disability reports", key: "/disability-reports" },
    ]
    return (
        <>
            <Layout>
                <Content>
                    <PagesHeader title="Reports" subTitle="Click to view detailed reports" />
                    {/* <List
                        size="large"
                        header={<div>Reports</div>}
                        bordered
                        dataSource={data}
                        rowKey={item.key}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<Link href={item.key}><a>View</a></Link>]}
                            >
                                {item.text}
                            </List.Item>
                        )}>
                    </List> */}
                </Content>
            </Layout>
        </>
    );
}

export default Reports;