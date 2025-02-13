"use client";
import Image from "next/image";
import BigCalender from "@/components/BigCalender";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import PerformancePieChart from "@/components/PerformancePieChart";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 px-2 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* LEFT SIDE: Top section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-devanshSky px-4 py-6 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={
                  "https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt=""
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Meghana Kansara</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium xl:gap-1">
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/date.png"} alt="" height={14} width={14} />
                  <span>November 2024</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/mail.png"} alt="" height={14} width={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/phone.png"} alt="" height={14} width={14} />
                  <span>+1 234 567 8900</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
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
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleBranch.png"}
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleClass.png"}
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="w-full bg-white p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src={"/singleLesson.png"}
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT SIDE: Bottom section */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalender />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORCUT LINKS */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
            <Link
              className="p-2 rounded-md bg-devanshSkyLight"
              href={`/list/results?studentId=${"student2"}`}
            >
              Student&apos;s Results
            </Link>
            <Link
              className="p-2 rounded-md bg-devanshPurpleLight"
              href={`/list/lessons?classId=${2}`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              className="p-2 rounded-md bg-devanshYellowLight"
              href={`/list/teachers?classId=${2}`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className="p-2 rounded-md bg-pink-100"
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="p-2 rounded-md bg-devanshSkyLight"
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s Assignments
            </Link>
          </div>
        </div>

        {/* Performance Report */}
        <PerformancePieChart />

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
