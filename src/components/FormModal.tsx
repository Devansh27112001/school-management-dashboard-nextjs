"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import LoadingSpinner from "./LoadingSpinner";
import {
  deleteClass,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormModalContainerProps } from "./FormContainer";

const deletionMap: any = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  // parent: deleteClass,
  // announcement: deleteClass,
  // event: deleteClass,
  // lesson: deleteClass,
  // exam: deleteClass,
  // assignment: deleteClass,
  // result: deleteClass,
  // attendance: deleteClass,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <LoadingSpinner />,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <LoadingSpinner />,
});

// const ParentForm = dynamic(() => import("./forms/ParentForm"), {
//   loading: () => <LoadingSpinner />,
// });

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <LoadingSpinner />,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <LoadingSpinner />,
});

type FormObject = Record<
  string,
  (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: any,
    relatedData?: any
  ) => JSX.Element
>;

const form: FormObject = {
  teacher: (type, setOpen, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (type, setOpen, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  // parent: (type, setOpen, data) => (
  //   <ParentForm type={type} data={data} setOpen={setOpen} />
  // ),
  subject: (type, setOpen, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (type, setOpen, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormModalContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);

  const size = type === "create" ? "size-8" : "size-7";
  const bgColor =
    type === "create"
      ? "bg-devanshYellow"
      : type === "update"
      ? "bg-devanshSky"
      : "bg-devanshPurple";

  const Form = () => {
    const [state, formAction] = useActionState(deletionMap[table], {
      success: false,
      error: false,
    });
    const router = useRouter();
    useEffect(() => {
      if (state.success && type === "delete") {
        toast(`${table} deleted successfully`);
        setOpen(false);
        router.refresh();
      }
    }, [state]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" hidden defaultValue={id} />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}{" "}
          record?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none self-center w-max">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      form[table](type, setOpen, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
      >
        <Image alt="" src={`/${type}.png`} width={16} height={16} />
      </button>
      {open && (
        // WRAPPER
        <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-65 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[50%]">
            <Form />
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src={"/close.png"} alt="" height={14} width={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
