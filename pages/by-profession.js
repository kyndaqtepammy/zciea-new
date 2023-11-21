import { Table, Space, Input } from "antd";
import PagesHeader from "../components/header/Pageheader";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { exportToCSV } from "../utils/excel-export";

export default function ByProffesion(members) {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [data, setData] = useState();
  const [dataSource, setDataSource] = useState(members?.members?.members);
  const [value, setValue] = useState();
  const [error, setError] = useState(false);
  const [professions, setProffesions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.zciea.trade/reports")
      .then((response) => response.json())
      .then((data) => {
        // Do something with the data
        setIsLoading(false);
        setData(data.members);
        setDataSource(data?.members);

        const tradeCounts = {};

        data?.members.forEach((item) => {
          const trade = item.trade;

          if (trade) {
            // If the trade is not already a key in tradeCounts, create it and set the initial value to 0
            if (!tradeCounts[trade]) {
              tradeCounts[trade] = 0;
            }

            // Increment the count for the current trade
            tradeCounts[trade]++;
          }
        });
        const tradeArray = Object.entries(tradeCounts).map(
          ([trade, count]) => ({
            trade,
            count,
          })
        );
        console.log(tradeArray);
        setProffesions(tradeArray);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Trade",
      dataIndex: "trade",
      key: "trade",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div className="site-card-wrapper">
      <div>
        <PagesHeader title="By Profesion" subTitle="All members professions" />
        <Button
          title=""
          onClick={() => {
            exportToCSV(
              professions,
              "Trades Report_" +
                new Date(Date.now()).toLocaleString().split(",")[0],
              ["Trade", "Total members"]
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
            <Table dataSource={professions} columns={columns} />
          )}
        </div>
      </div>
    </div>
  );
}
