import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { searchParamsType } from "@/lib/types";
import { Class, Prisma, Teacher } from "@prisma/client";
import Image from "next/image";

type ClassesList = Class & { supervisor: Teacher };

const columns = [
  {
    header: "Class Name",
    accessor: "className",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: ClassesList) => (
  <tr
    key={item.id}
    className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <h3 className="font-medium text-sm">{item.name}</h3>
    </td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden lg:table-cell">{item.supervisor.name}</td>

    <td>
      <div className="flex gap-2 items-center">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  const { page = 1, ...queryString } = await searchParams;
  const query: Prisma.ClassWhereInput = {};

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

            {role === "admin" && <FormModal table="class" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION SECTION */}
      <Pagination page={+page} count={count} />
    </div>
  );
};

export default ClassesListPage;
