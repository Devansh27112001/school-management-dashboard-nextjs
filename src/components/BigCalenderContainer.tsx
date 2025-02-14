import prisma from "@/lib/prisma";
import BigCalender from "./BigCalender";
import moment from "moment";

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
      start: moment.utc(item.startTime).local().toDate(),
      end: moment.utc(item.startTime).local().toDate(),
      allDay: false,
    };
  });
  return (
    <div>
      <BigCalender data={data} />
    </div>
  );
};

export default BigCalenderContainer;
