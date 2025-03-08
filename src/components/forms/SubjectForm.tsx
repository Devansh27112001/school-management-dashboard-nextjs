"use client";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/lib/actions";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormProps } from "@/lib/types";

const SubjectForm = ({ type, setOpen, data, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({ resolver: zodResolver(subjectSchema) });

  const router = useRouter();
  // React-Version in <19, still have to "useActionState" --> Previous "useFormState"
  const [state, formAction] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const { teachers } = relatedData;
  const defaultValues = data?.teachers?.map((teacher: any) => teacher.id);
  // Submit function
  const onSubmit = (data: any) => {
    startTransition(() => formAction(data));
  };

  // After success on update/create subject.
  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, setOpen, type]);

  // ---------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h1 className="">
        {type === "create"
          ? "Create a new subject"
          : "Update the subject details"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Subject name"
          error={errors?.name}
          name="name"
          register={register}
          defaultValue={data?.name}
        />
        {data && (
          <InputField
            label=""
            name="id"
            type="hidden"
            register={register}
            error={errors?.id}
            defaultValue={data?.id}
          />
        )}
        {/* SELECT ELEMENT */}
        {/* The data that is passsed in the formAction will have the teacherIds of all the selected teachers */}
        <div className="flex flex-col gap-2 w-auto md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select teachers
          </label>
          <select
            multiple
            {...register("teachers")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
            defaultValue={defaultValues}
          >
            {teachers?.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors?.teachers?.message && (
            <p className="text-xs text-red-400">
              {errors?.teachers?.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500 text-s font-semibold self-center">
          Something went wrong!
        </span>
      )}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default SubjectForm;
