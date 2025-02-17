"use server";

import { SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type currentStateType = {
  success: boolean;
  error: boolean;
};

export const createSubject = async (
  currentState: currentStateType,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
