import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });
  const boys = data.find((item) => item.sex === "MALE")?._count || 0;
  const girls = data.find((item) => item.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full pt-2 px-2">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src={"/moreDark.png"} alt="" height={20} width={20} />
      </div>
      {/* CHART */}

      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="size-5 bg-devanshSky rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">
            Boys (
            {((boys / (boys + girls)) * 100).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="size-5 bg-devanshYellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">
            Girls (
            {((girls / (boys + girls)) * 100).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
