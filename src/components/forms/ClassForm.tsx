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
      </div>
    </form>
  );
};

export default ClassForm;
