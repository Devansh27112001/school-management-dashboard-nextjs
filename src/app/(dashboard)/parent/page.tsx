import Announcements from "@/components/Announcements";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import "react-big-calendar/lib/css/react-big-calendar.css";

const ParentPage = async () => {
  const { userId } = await auth();
  const students = await prisma.student.findMany({
    where: {
      parentId: userId!,
    },
  });
  return (
    <div className="p-4 gap-4 flex flex-col xl:flex-row flex-1">
      {/* LEFT */}
      <div>
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalenderContainer id={student.classId!} type="classId" />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
