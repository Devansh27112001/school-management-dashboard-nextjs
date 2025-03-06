"use server";
import { clerkClient } from "@clerk/nextjs/server";
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { role } from "./data";
import { connect } from "http2";

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
  if (!data.id) return { success: false, error: true };
  try {
    const client = await clerkClient();
    const user = await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
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
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
        classes: {
          set: data.classes?.map((classId: string) => ({
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

// -----------------------Student actions--------------------
export const createStudent = async (
  currentState: currentStateType,
  data: StudentSchema
) => {
  try {
    // Checking for the class capacity
    const selectedClass = await prisma.class.findUnique({
      where: {
        id: data.classId,
      },
      include: { _count: { select: { students: true } } },
    });

    if (
      selectedClass &&
      selectedClass.capacity === selectedClass._count.students
    ) {
      return { success: false, error: true };
    }

    // Creating a new user with the role of student in clerk.
    const client = await clerkClient();
    const user = await client.users.createUser({
      username: data.username,
      firstName: data.name,
      lastName: data.surname,
      password: data.password,
      publicMetadata: { role: "student" },
    });

    // Adding the student to the database.
    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
export const updateStudent = async (
  currentState: currentStateType,
  data: StudentSchema
) => {
  if (!data.id) return { success: false, error: true };
  try {
    const client = await clerkClient();
    await client.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        sex: data.sex,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
export const deleteStudent = async (
  currentState: currentStateType,
  data: FormData
) => {
  const studentId = data.get("id") as string;
  try {
    const client = await clerkClient();
    await client.users.deleteUser(studentId);
    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

// -----------------------Exam actions--------------------
export const createExam = async (
  currentState: currentStateType,
  data: ExamSchema
) => {
  try {
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: currentStateType,
  data: ExamSchema
) => {
  try {
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
