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
        const subjectTeachers = await prisma.subject.findMany({
          select: {
            teachers: {},
          },
        });
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <FormModal table={table} type={type} data={data} id={id} />
    </div>
  );
};

export default FormContainer;
