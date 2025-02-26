import Image from "next/image";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import PerformancePieChart from "@/components/PerformancePieChart";
import prisma from "@/lib/prisma";
import { Teacher } from "@prisma/client";
import { notFound } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import { getDetails } from "@/lib/clerkUtils";
import BigCalenderContainer from "@/components/BigCalenderContainer";

const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { role } = await getDetails();
  const { id } = await params;
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      subjects: {
        select: { id: true },
      },
      classes: {
        select: { id: true },
      },

      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
  if (!teacher) return notFound();
  return (
    <div className="flex-1 p-4 px-2 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* LEFT SIDE: Top section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-devanshSky px-4 py-6 rounded-md flex-1 flex gap-2">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/noAvatar.png"}
                alt=""
                width={140}
                height={140}
                className="size-32 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex justify-between items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium xl:gap-1">
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/date.png"} alt="" height={14} width={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-US").format(teacher.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/mail.png"} alt="" height={14} width={14} />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/phone.png"} alt="" height={14} width={14} />
                  <span>+1 {teacher.phone}</span>
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
                <span className="text-sm text-gray-400">Title</span>
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
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
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
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
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
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT SIDE: Bottom section */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalenderContainer type="teacherId" id={teacher.id} />
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
              href={`/list/classes?supervisorId=${"teacher10"}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-2 rounded-md bg-devanshPurpleLight"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-2 rounded-md bg-devanshYellowLight"
              href={`/list/lessons?teacherId=${"teacher12"}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-2 rounded-md bg-pink-100"
              href={`/list/exams?teacherId=${"teacher12"}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-2 rounded-md bg-devanshSkyLight"
              href={`/list/assignments?teacherId=${"teacher12"}`}
            >
              Teacher&apos;s Assignments
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

export default SingleTeacherPage;
