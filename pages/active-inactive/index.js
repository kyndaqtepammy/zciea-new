import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PagesHeader from "../../components/header/Pageheader";

const Bar = dynamic(() => import("@ant-design/charts").then(({ Bar }) => Bar), {
  ssr: false,
});
export default function ActiveInactive(members) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(members);
    setData(members?.members?.members);
  }, [members]);
  return (
    <>
      <div className="site-card-wrapper">
        <div>
          <PagesHeader
            title="Disability Report"
            subTitle="Members by disablity"
          />
          {data?.length > 0 ? (
            <div className="site-card-wrapper">
              <Bar {...config} />
            </div>
          ) : (
            <div
              className="site-card-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "80vh",
                alignItems: "center",
              }}
            >
              <h2>No data to show</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
