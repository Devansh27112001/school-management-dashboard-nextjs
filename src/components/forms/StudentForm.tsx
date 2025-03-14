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
  const { grades, classes } = relatedData;
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
  const [image, setImage] = useState<any>();
  const onSubmit = (data: any) => {
    startTransition(() => formAction({ ...data, image: image?.secure_url }));
  };

  useEffect(() => {
    if (state.success) {
      toast(`The student has been ${type}d successfully.`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, setOpen, type]);
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="">{type} Student</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {data && (
          <InputField
            label="Id"
            error={errors?.id}
            register={register}
            name="id"
            defaultValue={data?.id}
            hidden
          />
        )}
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
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          type="date"
        />
        <InputField
          label="Parent Id"
          error={errors?.parentId}
          register={register}
          name="parentId"
          defaultValue={data?.parentId}
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
            Select grade
          </label>
          <select
            {...register("gradeId")}
            defaultValue={data?.gradeId || -1}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
          >
            <option value={-1}>--Select a grade--</option>
            {grades?.map((grade: { id: number; level: string }) => (
              <option key={grade.id} value={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors?.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors?.gradeId?.message.toString()}
            </p>
          )}
        </div>

        {/* SELECT ELEMENT - CLASSES */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 group">
          <label className="text-xs text-gray-500 group-focus-within:font-semibold transition-all duration-300">
            Select class
          </label>
          <select
            {...register("classId")}
            defaultValue={data?.classId || -1}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md w-full focus:ring-blue-300 outline-none transition-all duration-300 text-sm"
          >
            <option value={-1}>--Select a class--</option>
            {classes?.map(
              (singleClass: {
                id: number;
                name: string;
                capacity: number;
                _count: { students: number };
              }) => (
                <option key={singleClass.id} value={singleClass.id}>
                  {singleClass.name} -{" "}
                  {singleClass._count.students + "/" + singleClass.capacity}
                </option>
              )
            )}
          </select>
          {errors?.classId?.message && (
            <p className="text-xs text-red-400">
              {errors?.classId?.message.toString()}
            </p>
          )}
        </div>

        {/* UPLOAD PHOTO */}
        <CldUploadWidget
          uploadPreset="school_management"
          onSuccess={(result, { widget }) => {
            setImage(result.info);
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
                {image && (
                  <Image
                    src={image.secure_url}
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
