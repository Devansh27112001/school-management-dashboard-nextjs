import prisma from "@/lib/prisma";
import BigCalender from "./BigCalender";
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

  const schedule = adjustScheduleToCurrentWeek(data);
  console.log(schedule);

  return (
    <div>
      <BigCalender data={schedule} />
    </div>
  );
};

export default BigCalenderContainer;

// {
//   title: 'Lesson20',
//   start: 2025-02-14T12:17:55.108Z,
//   end: 2025-02-14T13:17:55.108Z
// },
// {
//   title: 'Lesson5',
//   start: 2025-02-11T14:17:55.065Z,
//   end: 2025-02-11T15:17:55.065Z
// }
