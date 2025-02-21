"use server";
import { ClassSchema, SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";

type currentStateType = {
  success: boolean;
  error: boolean;
};

// ------------------------Subject actions------------------------

export const createSubject = async (
  currentState: currentStateType,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({
            id: teacherId,
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: currentStateType,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({
            id: teacherId,
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
  // return { success: true, error: false };
};

export const deleteSubject = async (
  currentState: currentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

// ----------------------Class actions------------------------------
export const createClass = async (
  currentState: currentStateType,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: currentStateType,
  data: ClassSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {},
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: currentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
