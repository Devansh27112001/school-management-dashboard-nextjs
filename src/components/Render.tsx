import {
  AnnouncementList,
  AssignmentsList,
  ClassesList,
  EventsList,
  ExamsList,
} from "@/lib/types";
import FormModal from "./FormModal";

// ANNOUNCEMENTS
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

// ASSIGNMENTS
export const renderAssignmentsRow = (item: AssignmentsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.lesson.subject.name}</h3>
      </td>
      <td className="">{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
      </td>

      <td>
        <div className="flex gap-2 items-center">
          {role === "admin" && (
            <>
              <FormModal data={item} type="update" table="assignment" />
              <FormModal id={item.id} type="delete" table="assignment" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// CLASSES
export const renderClassesRow = (item: ClassesList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden lg:table-cell">
        {item.supervisor.name + " " + item.supervisor.surname}
      </td>

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
};

// EVENTS
export const renderEventsRow = (item: EventsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.title}</h3>
      </td>
      <td className="relative">
        {item.class.name}{" "}
        {/* <span className="text-[10px]  bg-devanshYellow px-[0.1rem] rounded-lg absolute -left-3 -top-1">
      {item.type}
    </span> */}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td className="hidden md:table-cell">
        {item.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td>
        <div className="flex gap-2 items-center">
          {role === "admin" && (
            <>
              <FormModal data={item} type="update" table="event" />
              <FormModal id={item.id} type="delete" table="event" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// EXAMS
export const renderExamsRow = (item: ExamsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.lesson?.subject?.name}</h3>
      </td>
      <td className="">{item.lesson?.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson?.teacher?.name + " " + item.lesson?.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>

      <td>
        <div className="flex gap-2 items-center">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal data={item} type="update" table="exam" />
              <FormModal id={item.id} type="delete" table="exam" />
            </>
          )}
        </div>
        z
      </td>
    </tr>
  );
};
