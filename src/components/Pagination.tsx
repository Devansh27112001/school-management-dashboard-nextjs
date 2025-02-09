"use client";

import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  count: number;
};

const Pagination = ({ page, count }: PaginationProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
      <button
        disabled={page === 1}
        className="bg-gray-300 py-2 px-4 rounded-md text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 ease-in"
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </button>
      <div className="text-sm flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-2 ${page === i + 1 && "bg-devanshSky"} rounded-sm `}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        disabled={page === totalPages || totalPages === 0}
        className="bg-gray-300 py-2 px-4 rounded-md text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed  hover:scale-105 transition-all duration-200 ease-in"
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
