import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

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
  const { userId: currentUserId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
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

        const teacherClasses = await prisma.class.findMany({
          select: { id: true, name: true },
        });

        relatedData = {
          subjects: teacherSubjects,
          classes: teacherClasses,
        };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });

        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { grades: studentGrades, classes: studentClasses };
        break;

      case "exam":
        // If the role is admin, then we want to fetch all the lessons but if the role is teacher, then we want to fetch only those lessons which belong to that particular teacher.
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
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
