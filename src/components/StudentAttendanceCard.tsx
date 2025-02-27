import prisma from "@/lib/prisma";
import Image from "next/image";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
    },
  });
  console.log(attendance);
  return (
    <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
      <Image
        src={"/singleAttendance.png"}
        alt=""
        width={24}
        height={24}
        className="size-6"
      />
      <div>
        <h1 className="text-xl font-semibold">90%</h1>
        <span className="text-sm text-gray-400">Attendance</span>
      </div>
    </div>
  );
};

export default StudentAttendanceCard;
