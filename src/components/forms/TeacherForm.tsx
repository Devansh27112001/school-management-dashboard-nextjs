"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

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
    .number({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a number",
    })
    .min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.date({ message: "Birth date is required" }),
  sex: z.enum(["male", "female", "other"], {
    message: "Sex is required",
  }),
  img: z.instanceof(File, {
    message: "Image is required",
  }),
});

type Inputs = z.infer<typeof schema>;

type TeacherFormProps = {
  type: "create" | "update";
  data?: any;
};

const TeacherForm = ({ type, data }: TeacherFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">Create a new Teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication information
      </span>
      <InputField
        label="Username"
        error={errors?.username}
        register={register}
        name="username"
        defaultValue={data?.username}
      />
      <span className="text-xs text-gray-400 font-medium">
        Personal information
      </span>
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default TeacherForm;
