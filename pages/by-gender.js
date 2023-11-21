import { Table, Space, Input } from "antd";
import PagesHeader from "../components/header/Pageheader";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { exportToCSV } from "../utils/excel-export";
import dynamic from "next/dynamic";
const Bar = dynamic(() => import("@ant-design/charts").then(({ Bar }) => Bar), {
  ssr: false,
});
export default function ByGender() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [genderCount, setGenderCount] = useState([]);

  const config = {
    data: genderCount,
    xField: "count",
    yField: "gender",
    seriesField: "gender",
    legend: {
      position: "top-left",
    },
    height: 700,
  };
  useEffect(() => {
    fetch("https://api.zciea.trade/reports")
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        setIsLoading(false);
        setData(data.members);

        // Initialize objects to store counts for each gender
        const genderCounts = {
          male: 0,
          female: 0,
        };

        data?.members.forEach((item) => {
          const gender = item?.gender?.toLowerCase();

          // Increment the count for the current gender
          if (gender === "male") {
            genderCounts.male++;
          } else if (gender === "female") {
            genderCounts.female++;
          }
        });
        const genderDataArray = Object.entries(genderCounts).map(
          ([gender, count]) => ({
            gender,
            count,
          })
        );
        setGenderCount(genderDataArray);
        console.log(genderDataArray);
      })
      .catch((error) => {
        console.error("Error:", error);
        //setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="site-card-wrapper">
      <div>
        <PagesHeader title="By Gender" subTitle="All members gender" />
        <Button
          title=""
          onClick={() => {
            exportToCSV(
              genderCount,
              "Gender Report_" +
                new Date(Date.now()).toLocaleString().split(",")[0],
              ["Gender", "Total Number"]
            );
          }}>
          Export as Excel
        </Button>
        <div className="site-card-wrapper">
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}>
              <h2>Loading...</h2>
            </div>
          ) : genderCount ? (
            <Bar {...config} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
