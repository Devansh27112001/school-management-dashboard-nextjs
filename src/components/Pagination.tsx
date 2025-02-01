type PaginationProps = {
  page: number;
  count: number;
};

const Pagination = ({ page, count }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
      <button
        disabled
        className="bg-gray-300 py-2 px-4 rounded-md text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="text-sm flex items-center gap-2">
        <button className="px-2 rounded-sm bg-devanshSky">1</button>
        <button className="px-2 rounded-sm">2</button>
        <button className="px-2 rounded-sm">3</button>
        <button className="px-2 rounded-sm">...</button>
        <button className="px-2 rounded-sm">10</button>
      </div>
      <button className="bg-gray-300 py-2 px-4 rounded-md text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
