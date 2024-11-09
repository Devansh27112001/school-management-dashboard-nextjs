"use client";
import Announcements from "@/components/Announcements";
import BigCalender from "@/components/BigCalender";
import "react-big-calendar/lib/css/react-big-calendar.css";

const TeacherPage = () => {
  return (
    <div className="p-4 gap-4 flex flex-col xl:flex-row flex-1">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalender />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
