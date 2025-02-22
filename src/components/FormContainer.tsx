import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

export type FormModalContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  // Remove the number type from the id prop. This is just temporary.
  id?: string | number;
};
const FormContainer = async ({
  table,
  type,
  data,
  id,
}: FormModalContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectsTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectsTeachers };
        break;

      case "class":
        const classGrades = await prisma.grade.findMany({
          select: {
            id: true,
            level: true,
          },
        });

        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;

      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });

        const teacherLessons = await prisma.lesson.findMany({
          select: { id: true, name: true },
        });

        const teacherClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });

        relatedData = {
          subjects: teacherSubjects,
          lessons: teacherLessons,
          classes: teacherClasses,
        };
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
