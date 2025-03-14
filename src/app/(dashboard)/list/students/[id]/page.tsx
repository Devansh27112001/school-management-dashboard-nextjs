import Image from "next/image";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import PerformancePieChart from "@/components/PerformancePieChart";
import BigCalenderContainer from "@/components/BigCalenderContainer";
import prisma from "@/lib/prisma";
import { Class, Student } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { gradeFormat } from "@/lib/format";
import { Suspense } from "react";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import FormContainer from "@/components/FormContainer";

const SingleStudentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;

  const { id } = await params;
  const student:
    | (Student & { Class: Class & { _count: { lessons: number } } })
    | null = await prisma.student.findUnique({
    where: { id },
    include: { Class: { include: { _count: { select: { lessons: true } } } } },
  });
  if (!student) return notFound();
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
                src={student.image || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium xl:gap-1">
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/date.png"} alt="" height={14} width={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-US").format(student.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/mail.png"} alt="" height={14} width={14} />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex items-center gap-2">
                  <Image src={"/phone.png"} alt="" height={14} width={14} />
                  <span>+1 {student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <Suspense fallback={<LoadingSpinner />}>
              <StudentAttendanceCard id={student.id} />
            </Suspense>
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
                  {student.Class.gradeId}
                  {gradeFormat(student.Class.gradeId)}
                </h1>
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
                <h1 className="text-xl font-semibold">
                  {student.Class._count.lessons}
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
                <h1 className="text-xl font-semibold">{student.Class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT SIDE: Bottom section */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalenderContainer type="classId" id={student.Class.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUT LINKS */}
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
