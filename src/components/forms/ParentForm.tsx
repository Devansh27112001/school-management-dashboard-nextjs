"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{9,13}$/, { message: "Invalid phone number!" }),
  address: z.string().min(1, { message: "Address is required" }),
  bloodType: z
    .string()
    .regex(/(A|B|AB|O)[+-]/, { message: "Invalid blood type!" }),
  birthday: z.date({ message: "Birthday is required" }),
  sex: z.enum(["Male", "Female", "Other"], { message: "Sex is required" }),

  img: z.instanceof(File, { message: "Pleas upload and image" }),
});

type Inputs = z.infer<typeof schema>;

type ParentFormProps = {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: any;
};

const ParentForm = ({ type, setOpen, data }: ParentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    alert("Form submitted successfully");
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="">Create a Parent</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          error={errors?.username}
          name="username"
          register={register}
          defaultValue={data?.username}
        />
        <InputField
          label="Email"
          type="email"
          error={errors?.email}
          name="email"
          register={register}
          defaultValue={data?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          error={errors?.password}
          register={register}
          defaultValue={data?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First name"
          error={errors?.firstName}
          register={register}
          name="firstName"
          defaultValue={data?.firstName}
        />
        <InputField
          label="Last name"
          error={errors?.lastName}
          register={register}
          name="lastName"
          defaultValue={data?.lastName}
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

        {/* GENDER SELECT ELEMENT */}
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

        {/* UPLOAD PHOTO ELEMENT*/}
        <div className="flex flex-col gap-2 w-full md:w-[63%] md:mt-5 self-center justify-start">
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

export default ParentForm;
