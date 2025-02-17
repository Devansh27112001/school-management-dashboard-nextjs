"use client";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/lib/actions";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type SubjectFormProps = {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: any;
};

type ActiontoCallType = (
  currentState: { success: boolean; error: boolean },
  data: SubjectSchema
) => Promise<{
  success: boolean;
  error: boolean;
}>;

const SubjectForm = ({ type, setOpen, data }: SubjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({ resolver: zodResolver(subjectSchema) });

  let actionToCall: ActiontoCallType = async (
    currentState: {
      success: boolean;
      error: boolean;
    },
    data: SubjectSchema
  ): Promise<{ success: boolean; error: boolean }> => {
    return currentState;
  };
  switch (type) {
    case "create":
      actionToCall = createSubject;
      break;
    case "update":
      actionToCall = updateSubject;
      break;
    default:
      break;
  }

  // React-Version in <19, still have to "useActionState" --> Previous "useFormState"
  const [state, formAction] = useActionState(actionToCall, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const onSubmit: any = (data: any) => {
    startTransition(() => formAction(data));
  };

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h1 className="">
        {type === "create"
          ? "Create a new subject"
          : "Update the subject details"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject name"
          error={errors?.name}
          name="name"
          register={register}
          defaultValue={data?.name}
        />
        <InputField
          label=""
          name="id"
          type="hidden"
          register={register}
          error={errors?.name}
          defaultValue={data?.id}
        />
      </div>
      {state.error && (
        <span className="text-red-500 text-s font-semibold self-center">
          Something went wrong!
        </span>
      )}
      <button type="submit" className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default SubjectForm;
