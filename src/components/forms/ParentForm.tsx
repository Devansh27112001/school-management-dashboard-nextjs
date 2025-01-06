"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  data?: any;
};

const ParentForm = ({ type, data }: ParentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  return (
    <form className="flex flex-col gap-8">
      <h1 className="">Create a Parent</h1>
    </form>
  );
};

export default ParentForm;
