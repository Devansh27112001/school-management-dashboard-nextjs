"use client";
import Image from "next/image";
import { useState } from "react";

type FormModalProps = {
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
  id?: number;
};
const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const [open, setOpen] = useState(false);

  const size = type === "create" ? "size-8" : "size-7";
  const bgColor =
    type === "create"
      ? "bg-devanshYellow"
      : type === "update"
      ? "bg-devanshSky"
      : "bg-devanshPurple";

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}{" "}
          record?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none">
          Delete
        </button>
      </form>
    ) : (
      "Create or update record"
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
