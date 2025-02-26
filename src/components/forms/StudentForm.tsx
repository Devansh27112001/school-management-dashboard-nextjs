"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchemas";
import { FormProps } from "@/lib/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import { createStudent, updateStudent } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const StudentForm = ({ type, setOpen, data, relatedData }: FormProps) => {
  const { grades } = relatedData;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({ resolver: zodResolver(studentSchema) });

  const [state, formAction] = useActionState(
    type === "create" ? createStudent : updateStudent,
    { success: false, error: false }
  );
  const [img, setImg] = useState<any>();
  const onSubmit = (data: any) => {
    console.log(data);
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (state.success) {
      toast(`The student has been ${type}d successfully.`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="">Create a new Student</h1>
      <span className="text-xs text-gray-400 font-medium">
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
      <span className="text-xs text-gray-400 font-medium">
        Personal information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
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
        {/* SELECT ELEMENT - Sex*/}
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

        {/* SELECT ELEMENT - GRADES */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select grades
          </label>
          <select
            {...register("grades")}
            defaultValue={data?.grades?.map(
              (grade: { id: number }) => grade.id
            )}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
          >
            {grades?.map((grade: { id: number; level: string }) => (
              <option key={grade.id} value={grade.level}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors?.sex?.message && (
            <p className="text-xs text-red-400">
              {errors?.sex?.message.toString()}
            </p>
          )}
        </div>

        {/* UPLOAD PHOTO */}
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
      {state?.error && (
        <span className="text-sm text-red-500">Soemthing went wrong!</span>
      )}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default StudentForm;
