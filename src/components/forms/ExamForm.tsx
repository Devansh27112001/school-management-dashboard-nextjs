"use client";
import { createExam, updateExam } from "@/lib/actions";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { FormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ExamForm = ({ data, setOpen, relatedData, type }: FormProps) => {
  const { lessons } = relatedData;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({ resolver: zodResolver(examSchema) });

  const [state, formAction] = useActionState(
    type === "create" ? createExam : updateExam,
    { success: false, error: false }
  );

  useEffect(() => {
    if (state.success) {
      toast(`The exam has been ${type}d successfully`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return <form className="flex flex-col gap-8">ExamForm</form>;
};

export default ExamForm;
