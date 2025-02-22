"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { FormProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const TeacherForm = ({ type, setOpen, data, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({ resolver: zodResolver(teacherSchema) });

  const { subjects, lessons, classes } = relatedData;
  const router = useRouter();

  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    { success: false, error: false }
  );
  const onSubmit = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    if (state.success) {
      toast(`The teacher has been ${type}d successfully`);
      setOpen(false);
      router.refresh();
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Create a new Teacher</h1>
      <span className="text-xs text-gray-400 font-bold">
        Authentication information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          error={errors?.username}
          register={register}
          name="username"
          defaultValue={data?.username}
        />{" "}
        <InputField
          label="Email"
          type="email"
          error={errors?.email}
          register={register}
          name="email"
          defaultValue={data?.email}
        />{" "}
        <InputField
          label="Password"
          type="password"
          error={errors?.password}
          register={register}
          name="password"
          defaultValue={data?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-bold">
        Personal information
      </span>
      <div className="flex justify-between flex-wrap gap-3">
        <InputField
          label="First name"
          error={errors?.name}
          register={register}
          name="name"
          defaultValue={data?.name}
        />
        <InputField
          label="Last name"
          error={errors?.surname}
          register={register}
          name="surname"
          defaultValue={data?.surname}
        />
        <InputField
          label="Phone"
          error={errors?.phone}
          register={register}
          name="phone"
          defaultValue={data?.phone}
        />
        <InputField
          label="Address"
          error={errors?.address}
          register={register}
          name="address"
          defaultValue={data?.address}
        />
        <InputField
          label="Blood Type"
          error={errors?.bloodType}
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
        />
        <InputField
          label="Birthday"
          error={errors?.birthday}
          register={register}
          name="birthday"
          defaultValue={data?.birthday}
          type="date"
        />
        {/* SELECT ELEMENT - GENDER */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Sex
          </label>
          <select
            {...register("sex")}
            defaultValue={data?.sex}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors?.sex?.message && (
            <p className="text-xs text-red-400">
              {errors?.sex?.message.toString()}
            </p>
          )}
        </div>

        {/* SELECT ELEMENT - Subjects */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select Subjects
          </label>
          <select
            multiple
            {...register("subjects")}
            defaultValue={data?.subjects}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm h-16"
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors?.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors?.subjects?.message.toString()}
            </p>
          )}
        </div>

        {/* SELECT ELEMENT - Lessons */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select Lessons
          </label>
          <select
            multiple
            {...register("lessons")}
            defaultValue={data?.lessons}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm h-16"
          >
            {lessons.map((lesson: { id: number; name: string }) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors?.lessons?.message && (
            <p className="text-xs text-red-400">
              {errors?.lessons?.message.toString()}
            </p>
          )}
        </div>
        {/* SELECT ELEMENT - Classes */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select Classes
          </label>
          <select
            multiple
            {...register("classes")}
            defaultValue={data?.classes}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm h-16"
          >
            {classes.map((singleClass: { id: number; name: string }) => (
              <option key={singleClass.id} value={singleClass.id}>
                {singleClass.name}
              </option>
            ))}
          </select>
          {errors?.classes?.message && (
            <p className="text-xs text-red-400">
              {errors?.classes?.message.toString()}
            </p>
          )}
        </div>

        {/* UPLOAD PHOTO */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 self-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer font-semibold"
            htmlFor="image"
          >
            <Image src={"/upload.png"} width={24} height={24} alt="" />
            <span>Upload photo</span>
          </label>
          <input
            type="file"
            {...register("img")}
            className="hidden"
            id="image"
          />
          {errors?.img?.message && (
            <p className="text-xs text-red-400">{errors.img.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default TeacherForm;
