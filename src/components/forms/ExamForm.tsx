"use client";
import { createExam, updateExam } from "@/lib/actions";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { FormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../InputField";

const ExamForm = ({ data, setOpen, relatedData, type }: FormProps) => {
  const { lessons } = relatedData;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({ resolver: zodResolver(examSchema) });

  const [state, formAction] = useActionState(
    type === "create" ? createExam : updateExam,
    { success: false, error: false }
  );

  const onSubmit = (data: ExamSchema) => {
    console.log(data);
    // startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (state.success) {
      toast(`The exam has been ${type}d successfully`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1>{type === "create" ? "Create Exam" : "Update Exam"}</h1>
      <span className="text-xs text-gray-400 font-medium">Enter details</span>
      <div className="flex justify-between flex-wrap gap-4">
        {data && (
          <InputField
            label="id"
            error={errors?.id}
            register={register}
            name="id"
            defaultValue={data?.id}
            hidden
          />
        )}
        <InputField
          label="Title"
          name="title"
          register={register}
          error={errors?.title}
          defaultValue={data?.title}
        />
        <InputField
          label="Start Date"
          name="startTime"
          register={register}
          error={errors?.startTime}
          defaultValue={data?.startTime?.toISOString().split("T")[0]}
          type="datetime-local"
        />{" "}
        <InputField
          label="End date"
          name="endTime"
          register={register}
          error={errors?.endTime}
          defaultValue={data?.endTime?.toISOString().split("T")[0]}
          type="datetime-local"
        />
        <div className="flex-col flex gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select lesson
          </label>
          <select
            {...register("lessonId")}
            defaultValue={data?.lessonId}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
          >
            <option value="">---Select a lesson---</option>
            {lessons.map((lesson: { id: number; name: string }) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors?.lessonId?.message && (
            <p className="text-xs text-red-500">
              {errors?.lessonId?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default ExamForm;
