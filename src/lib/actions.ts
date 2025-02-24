"use server";
import { clerkClient } from "@clerk/nextjs/server";
import {
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
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
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
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
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

// ----------------------Teacher actions------------------------------
export const createTeacher = async (
  currentState: currentStateType,
  data: TeacherSchema
) => {
  try {
    // creating user with role="teacher" in clerk.
    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    // creating teacher in database
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        sex: data.sex,
        bloodType: data.bloodType,
        phone: data.phone,
        address: data.address,
        img: data.img,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
        classes: {
          connect: data.classes?.map((classId: string) => ({
            id: parseInt(classId),
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: currentStateType,
  data: TeacherSchema
) => {
  try {
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: currentStateType,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Deleting user from clerk
    const client = await clerkClient();
    await client.users.deleteUser(id);

    // Deleting teacher from database

    await prisma.teacher.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
