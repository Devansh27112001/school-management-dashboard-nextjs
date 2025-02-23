"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { FormProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const TeacherForm = ({ type, setOpen, data, relatedData }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({ resolver: zodResolver(teacherSchema) });

  const { subjects, classes } = relatedData;
  const router = useRouter();
  const [img, setImg] = useState<any>();

  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    { success: false, error: false }
  );
  const onSubmit = (data: any) => {
    console.log(data);
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (state.success) {
      toast(`The teacher has been ${type}d successfully`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return (
    <form
      className="flex flex-col gap-8 md:gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold">Create a new Teacher</h1>
      <span className="text-xs text-gray-400 font-bold">
        Authentication information
      </span>
      <div className="flex justify-between flex-wrap gap-4 md:gap-2">
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
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
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
        <CldUploadWidget
          uploadPreset="school_management"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-gray-400 flex items-center w-full md:w-1/4 gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src={"/upload.png"} alt="" width={28} height={28} />
                <span>Upload a photo</span>
                {img && (
                  <Image
                    src={img.secure_url}
                    alt="Image uploaded"
                    width={48}
                    height={48}
                  />
                )}
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      {state.error && (
        <span className="text-sm text-red-500">Something went wrong!</span>
      )}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default TeacherForm;
