import TableSearch from "@/components/TableSearch";
import Image from "next/image";

const TeachersListPage = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All teachers</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-2">
            <button className="p-2 bg-devanshYellow rounded-full">
              <Image src={"/filter.png"} width={14} height={14} alt={""} />
            </button>

            <button className="p-2 bg-devanshYellow rounded-full">
              <Image src={"/filter.png"} width={14} height={14} alt={""} />
            </button>
            <button className="p-2 bg-devanshYellow rounded-full">
              <Image src={"/filter.png"} width={14} height={14} alt={""} />
            </button>
          </div>
        </div>
      </div>
      {/* LIST SECTION */}
      <div className=""></div>
      {/* PAGINATION SECTION */}
      <div className=""></div>
    </div>
  );
};

export default TeachersListPage;
