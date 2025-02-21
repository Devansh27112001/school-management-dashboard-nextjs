import { createClass, updateClass } from "@/lib/actions";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../InputField";

type ClassFormProps = {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: any;
  relatedData?: any;
};

const ClassForm = ({ type, setOpen, data, relatedData }: ClassFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({ resolver: zodResolver(classSchema) });

  const [state, formAction] = useActionState(
    type === "create" ? createClass : updateClass,
    { success: false, error: false }
  );

  const { teachers, grades } = relatedData;
  console.log(teachers, grades);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type}ed`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="">
        {type === "create" ? "Create a new class" : "Update the class details"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Class name"
          error={errors?.name}
          name="name"
          register={register}
          defaultValue={data?.name}
        />
        <InputField
          label="Capacity"
          error={errors?.capacity}
          name="capacity"
          register={register}
          defaultValue={data?.capacity}
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
        <div className="flex flex-col gap-2 w-auto md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select supervisor
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
            {...register("supervisorId")}
            defaultValue={data?.teachers}
          >
            {teachers?.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors?.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors?.supervisorId?.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select grade
          </label>
          <select
            {...register("gradeId")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
            defaultValue={data?.gradeId}
          >
            {grades?.map((grade: { id: number; level: string }) => (
              <option key={grade.id} value={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default ClassForm;
