"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const CountChart = () => {
  const data = [
    {
      name: "Total",
      count: 106,
      fill: "white",
    },
    {
      name: "Girls",
      count: 53,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: 53,
      fill: "#CFCEFF",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full pt-2 px-2">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src={"/moreDark.png"} alt="" height={20} width={20} />
      </div>
      {/* CHART */}

      <div className={"relative"}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            width={200}
            height={200}
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

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="size-5 bg-devanshSky rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="size-5 bg-devanshYellow rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};
export default CountChart;
