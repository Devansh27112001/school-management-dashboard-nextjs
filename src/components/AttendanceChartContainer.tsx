import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  // SUNDAY - SATURDAY = 0 - 6 Fir days of the week
  const dayOftheWeek = today.getDay();

  // This will give us how many days since the last monday. For example, if today is Sunday, the from Saturday(yesterday) to previous Monday, it will be 6 days. And if today is Tuesday(dayOftheWeek = 2), then it will be 2 - 1 --> 1 days since the last Monday
  const daysSinceMonday = dayOftheWeek === 0 ? 6 : dayOftheWeek - 1;

  // We initialize the lastMonday to the current date.
  const lastMonday = new Date(today);

  // We then subtract the daysSinceMonday from the current date to get the date of the last Monday.
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: { date: true, present: true },
  });
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    // Here we will get the dayOftheweek from Sunday to Saturday = 0-6. But in the weekDays array, we will have days fo the week from 0 to 4. That is "monday" coming from dayOftheWeek will be 1 but monday is on the 0th index in weekDays array. so, we need to subtract 1 from the dayOftheWeek to get the correct day from the weekDays array.
    if (dayOftheWeek >= 1 && dayOftheWeek <= 5) {
      const dayName = weekDays[dayOftheWeek - 1];
      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });
  const data = weekDays.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));
  return (
    <div className="p-4 bg-white rounded-lg h-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src={"/moreDark.png"} alt="" height={20} width={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
