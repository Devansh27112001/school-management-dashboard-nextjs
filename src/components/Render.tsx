import { AnnouncementList } from "@/lib/types";
import FormModal from "./FormModal";

export const renderAnnouncementsRow = (
  item: AnnouncementList,
  role: string
) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.title}</h3>
      </td>
      <td className="relative hidden md:table-cell">
        {item.class.name}{" "}
        {/* <span className="text-[10px]  bg-devanshYellow px-[0.1rem] rounded-lg absolute -left-3 -top-1">
      {item.type}
    </span> */}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>
      <td>
        <div className="flex gap-2 items-center">
          {role === "admin" && (
            <>
              <FormModal data={item} type="update" table="announcement" />
              <FormModal id={item.id} type="delete" table="announcement" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
