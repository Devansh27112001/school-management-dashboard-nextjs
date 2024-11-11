interface TableColumnProps {
  header: string;
  accessor: string;
  className?: string;
}

interface TeachersDataProp {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
}

interface TableProps {
  columns: TableColumnProps[];
  renderRow: (item: TeachersDataProp) => React.ReactNode;
  data: TeachersDataProp[];
}

const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor} className={column.className || ""}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Table;
