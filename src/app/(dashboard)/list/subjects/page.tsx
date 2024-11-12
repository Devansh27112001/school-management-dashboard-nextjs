import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "subjectName",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const SubjectListPage = () => {
  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">{item.teachers?.join(", ")}</td>
      <td>
        <div className="flex gap-2 items-center">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="size-7 flex items-center justify-center bg-devanshSky rounded-full">
              <Image width={16} height={16} alt="" src={"/view.png"} />
            </button>
          </Link>
          {role === "admin" && (
            <button className="size-7 flex items-center justify-center bg-devanshPurple rounded-full">
              <Image width={16} height={16} alt="" src={"/delete.png"} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        {/* RIGHT CORNER */}
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>

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
              <button className="size-8 bg-devanshYellow rounded-full flex items-center justify-center">
                <Image src={"/plus.png"} width={14} height={14} alt={""} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />

      {/* PAGINATION SECTION */}
      <Pagination />
    </div>
  );
};

export default SubjectListPage;
