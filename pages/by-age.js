import dynamic from "next/dynamic";
import PagesHeader from "../components/header/Pageheader";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { exportToCSV } from "../utils/excel-export";
const Bar = dynamic(() => import("@ant-design/charts").then(({ Bar }) => Bar), {
  ssr: false,
});

export default function ByAge(members) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    data,
    xField: "count",
    yField: "range",
    seriesField: "count",
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
        // Helper function to calculate age based on date of birth
        function calculateAge(dateOfBirth) {
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          return age;
        }

        // Initialize an object to store counts for each age range
        const ageRangeCounts = {
          "0-20": 0,
          "21-30": 0,
          "31-40": 0,
          "41-50": 0,
          "51 and above": 0,
        };

        data?.members.forEach((item) => {
          const age = calculateAge(item.date_of_birth);

          // Determine the age range and increment the count
          if (age <= 20) {
            ageRangeCounts["0-20"]++;
          } else if (age <= 30) {
            ageRangeCounts["21-30"]++;
          } else if (age <= 40) {
            ageRangeCounts["31-40"]++;
          } else if (age <= 50) {
            ageRangeCounts["41-50"]++;
          } else {
            ageRangeCounts["51 and above"]++;
          }
        });

        // Convert the ageRangeCounts object into an array of objects
        const ageRangeArray = Object.entries(ageRangeCounts).map(
          ([range, count]) => ({ range, count })
        );

        console.log(ageRangeArray);
        setData(ageRangeArray);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="site-card-wrapper">
      <div>
        <PagesHeader title="By Age" subTitle="All members ages" />
        <Button
          title=""
          onClick={() => {
            exportToCSV(
              data,
              "Age Report_" +
                new Date(Date.now()).toLocaleString().split(",")[0],
              ["Age Range", "Total"]
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
          ) : (
            <Bar {...config} />
          )}
        </div>
      </div>
    </div>
  );
}
