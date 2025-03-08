import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { renderLessonsRow } from "@/components/Render";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { LessonsColumns } from "@/lib/columnsData";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { searchParamsType } from "@/lib/types";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const { page = 1, ...queryString } = await searchParams;
  const query: Prisma.LessonWhereInput = {};
  const columns = LessonsColumns(role);

  if (queryString) {
    for (const [key, value] of Object.entries(queryString)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          // In lesson, we will be searching by the subject name and also by the teacher name.
          case "search":
            query.OR = [
              {
                subject: { name: { contains: value, mode: "insensitive" } },
              },
              {
                teacher: { name: { contains: value, mode: "insensitive" } },
              },
            ];
            break;

          default:
            break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
        teacher: { select: { name: true, surname: true } },
        subject: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: (+page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.lesson.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        {/* RIGHT CORNER */}
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>

        {/* LEFT CORNER */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
              <Image src={"/filter.png"} width={14} height={14} alt={""} />
            </button>

            <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
              <Image src={"/sort.png"} width={14} height={14} alt={""} />
            </button>

            {role === "teacher" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <Table
        columns={columns}
        renderRow={(item) => renderLessonsRow(item, role)}
        data={data}
      />

      {/* PAGINATION SECTION */}
      <Pagination page={+page} count={count} />
    </div>
  );
};

export default LessonListPage;
