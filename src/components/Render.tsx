import {
  AnnouncementList,
  AssignmentsList,
  ClassesList,
  EventsList,
  ExamsList,
  LessonsList,
  ParentsList,
  ResultsList,
  StudentsList,
  SubjectsList,
  TeachersList,
} from "@/lib/types";
import FormModal from "./FormModal";
import Image from "next/image";
import Link from "next/link";
import FormContainer from "./FormContainer";

// ------------------------------------------------------------
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
        {item.class?.name || "-"}{" "}
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
// ------------------------------------------------------------
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
          {(role === "admin" || role === "teacher") && (
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

// ------------------------------------------------------------
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
              <FormContainer table="class" type="update" data={item} />
              <FormContainer table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// ------------------------------------------------------------
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
        {item.class?.name || "-"}{" "}
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

// ------------------------------------------------------------
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
      </td>
    </tr>
  );
};

// ------------------------------------------------------------
// LESSONS
export const renderLessonsRow = (item: LessonsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.subject.name}</h3>
      </td>
      <td className="">{item.class.name}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name + " " + item.teacher.surname}
      </td>

      <td>
        <div className="flex gap-2 items-center">
          {role === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// ------------------------------------------------------------
// SUBJECTS
export const renderSubjectsRow = (item: SubjectsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">
        {item.teachers?.map((teacher) => teacher.name).join(", ")}
      </td>
      <td>
        <div className="flex gap-2 items-center">
          {role === "admin" && (
            <>
              <FormContainer table="subject" type="update" data={item} />
              <FormContainer table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// ------------------------------------------------------------
// PARENTS
export const renderParentsRow = (item: ParentsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students?.map((student) => student.name).join(" ,")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex gap-2 items-center">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// ------------------------------------------------------------
// STUDENTS
export const renderStudentsRow = (item: StudentsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.image || "/noAvatar.png"}
          width={40}
          height={40}
          alt=""
          className="md:hidden xl:block size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item?.Class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.Class.name[0]}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex gap-2 items-center">
          <Link href={`/list/students/${item.id}`}>
            <button className="size-7 flex items-center justify-center bg-devanshSky rounded-full">
              <Image width={16} height={16} alt="" src={"/view.png"} />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

// ------------------------------------------------------
// RESULTS
export const renderResultsRow = (item: ResultsList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-medium text-sm">{item.title}</h3>
      </td>
      <td className="relative">
        {item.studentName + " " + item.studentSurname}{" "}
      </td>
      <td>{item.score}</td>
      <td className="hidden md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>

      <td>
        <div className="flex gap-2 items-center">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal data={item} type="update" table="result" />
              <FormModal id={item.id} type="delete" table="result" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// -------------------------------------------
// TEACHERS
export const renderTeachersRow = (item: TeachersList, role: string) => {
  return (
    <tr
      key={item.id}
      className="border-b border-b-200 even:bg-slate-50 text-sm hover:bg-devanshPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          width={40}
          height={40}
          alt=""
          className="md:hidden xl:block size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell max-w-20">
        {item.subjects?.map((subject) => subject.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes?.map((cls) => cls.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell max-w-44">{item.address}</td>
      <td>
        <div className="flex gap-2 items-center">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="size-7 flex items-center justify-center bg-devanshSky rounded-full">
              <Image width={16} height={16} alt="" src={"/view.png"} />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};
