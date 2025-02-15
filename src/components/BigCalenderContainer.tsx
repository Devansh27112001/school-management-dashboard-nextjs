import prisma from "@/lib/prisma";
import BigCalender from "./BigCalender";
import moment from "moment";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalenderContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: number | string;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      [type]: id,
    },
  });
  const data = dataRes.map((item) => {
    return {
      title: item.name,
      // Format: YYYY-MM-DD
      start: new Date(item.startTime),
      end: new Date(item.endTime),
    };
  });

  console.log(data);

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div>
      <BigCalender data={data} />
    </div>
  );
};

export default BigCalenderContainer;
