import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import { renderClassesRow } from "@/components/Render";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ClassesColumns } from "@/lib/columnsData";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { searchParamsType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import Image from "next/image";

const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const { page = 1, ...queryString } = await searchParams;
  const query: Prisma.ClassWhereInput = {};
  const columns = ClassesColumns(role);

  if (queryString) {
    for (const [key, value] of Object.entries(queryString)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
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
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (+page - 1) * ITEMS_PER_PAGE,
    }),
    prisma.class.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        {/* RIGHT CORNER */}
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>

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

            {role === "admin" && <FormContainer table="class" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <Table
        columns={columns}
        renderRow={(item) => renderClassesRow(item, role)}
        data={data}
      />

      {/* PAGINATION SECTION */}
      <Pagination page={+page} count={count} />
    </div>
  );
};

export default ClassesListPage;
