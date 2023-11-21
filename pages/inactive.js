import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PagesHeader from "../components/header/Pageheader";
import { Button } from "antd";
import { exportToCSV } from "../utils/excel-export";
const Bar = dynamic(() => import("@ant-design/charts").then(({ Bar }) => Bar), {
  ssr: false,
});

export default function Inactive(members) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(members);
    setData(members?.members?.members);
  }, [members]);

  const config = {
    data,
    xField: "inactive",
    yField: "territory",
    seriesField: "inactive",
    legend: {
      position: "top-left",
    },
    height: 700,
  };

  return (
    <>
      <div className="site-card-wrapper">
        <div>
          <PagesHeader title="Inactive Members" subTitle="Inactive members" />
          <Button
            title=""
            onClick={() => {
              exportToCSV(
                data,
                "Inactive Members Report_" +
                  new Date(Date.now()).toLocaleString().split(",")[0],
                ["Territory", "Inactive members"]
              );
            }}>
            Export as Excel
          </Button>
          <div className="site-card-wrapper">
            <Bar {...config} />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://api.zciea.trade/inactive");
  const members = await res.json();

  return {
    props: {
      members,
    },
  };
}
