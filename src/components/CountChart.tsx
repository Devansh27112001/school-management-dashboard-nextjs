"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  console.log(boys, girls);
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#CFCEFF",
    },
  ];

  return (
    <div className={"relative"}>
      <ResponsiveContainer width="100%" height="90%">
        <RadialBarChart
          width={250}
          height={250}
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src={"/maleFemale.png"}
        alt=""
        height={50}
        width={50}
        className={
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }
      />
    </div>
  );
};
export default CountChart;
