import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PagesHeader from "../components/header/Pageheader";

const Bar = dynamic(() => import("@ant-design/charts").then(({ Bar }) => Bar), {
  ssr: false,
});

export default function Disability(members) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(members);
    setData(members?.members?.members);
  }, [members]);

  const config = {
    data,
    xField: "population",
    yField: "territory",
    seriesField: "population",
    legend: {
      position: "top-left",
    },
    height: 700,
  };

  return (
    <>
      <div className="site-card-wrapper">
        <div>
          <PagesHeader
            title="Disability Report"
            subTitle="Members by disablity"
          />
          <div className="site-card-wrapper">
            <Bar {...config} />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://api.zciea.trade/disability");
  const members = await res.json();

  return {
    props: {
      members,
    },
  };
}
