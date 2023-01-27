import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PagesHeader from "../components/header/Pageheader";

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
