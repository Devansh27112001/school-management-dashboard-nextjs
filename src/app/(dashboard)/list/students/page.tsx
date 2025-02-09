import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { renderStudentsRow } from "@/components/Render";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { StudentsColumns } from "@/lib/columnsData";
import { role } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { searchParamsType } from "@/lib/types";
import { Prisma } from "@prisma/client";
import Image from "next/image";

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  const { page = 1, ...queryString } = await searchParams;
  const query: Prisma.StudentWhereInput = {};

  const columns = StudentsColumns(role);

  if (queryString) {
    for (const [key, value] of Object.entries(queryString)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.Class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };

          default:
            break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        Class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (+page - 1),
    }),
    prisma.student.count({
      where: query,
    }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
              <Image src={"/filter.png"} width={14} height={14} alt={""} />
            </button>

            <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
              <Image src={"/sort.png"} width={14} height={14} alt={""} />
            </button>

            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST SECTION */}
      <Table
        columns={columns}
        renderRow={(item) => renderStudentsRow(item, role)}
        data={data}
      />
      {/* PAGINATION SECTION */}
      <Pagination page={+page} count={count} />
    </div>
  );
};

export default StudentListPage;
