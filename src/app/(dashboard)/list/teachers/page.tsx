import Image from "next/image";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { role } from "@/lib/utils";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { renderTeachersRow } from "@/components/Render";
import { TeachersColumns } from "@/lib/columnsData";
import { searchParamsType } from "@/lib/types";
import FormContainer from "@/components/FormContainer";

const TeachersListPage = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  // In NextJs 15, we need to await the searchParams in order to get the query string.
  const { page = 1, ...queryString } = await searchParams;
  const query: Prisma.TeacherWhereInput = {};
  const columns = TeachersColumns(role);

  if (queryString) {
    for (const [key, value] of Object.entries(queryString)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;

          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (+page - 1),
    }),
    prisma.teacher.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
              <Image src={"/filter.png"} width={14} height={14} alt={""} />
            </button>

            <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
              <Image src={"/sort.png"} width={14} height={14} alt={""} />
            </button>

            {role === "admin" && (
              <FormContainer table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST SECTION */}
      <Table
        columns={columns}
        renderRow={(item) => renderTeachersRow(item, role)}
        data={data}
      />
      {/* PAGINATION SECTION */}
      <Pagination page={+page} count={count} />
    </div>
  );
};

export default TeachersListPage;
