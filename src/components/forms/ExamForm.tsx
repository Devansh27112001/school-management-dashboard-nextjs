"use client";
import { FormProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const ExamForm = ({ data, setOpen, relatedData, type }: FormProps) => {
  const { lessons } = relatedData;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return <form className="flex flex-col gap-8">ExamForm</form>;
};

export default ExamForm;
