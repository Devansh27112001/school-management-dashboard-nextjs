import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import { renderAnnouncementsRow } from "@/components/Render";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { AnnouncementColumns } from "@/lib/columnsData";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { searchParamsType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import Image from "next/image";

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  const { userId: currentUserId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const columns = AnnouncementColumns(role);

  const { page = 1, ...queryParams } = await searchParams;
  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = {
              contains: value,
              mode: "insensitive",
            };
        }
      }
    }
  }
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };

  query.OR = [
    { classId: null },
    { class: roleConditions[role as keyof typeof roleConditions] || {} },
  ];

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (+page - 1),
    }),
    prisma.announcement.count({
      where: query,
    }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        {/* RIGHT CORNER */}
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>

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

            {role === "admin" && (
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <Table
        columns={columns}
        renderRow={(item) => renderAnnouncementsRow(item, role)}
        data={data}
      />

      {/* PAGINATION SECTION */}
      <Pagination page={+page} count={count} />
    </div>
  );
};

export default AnnouncementListPage;
