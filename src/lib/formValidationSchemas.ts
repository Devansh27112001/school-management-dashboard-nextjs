import { z } from "zod";

// SUBJECT SCHEMA
export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(4, {
    message: "Subject name must be at least 4 characters long",
  }),
  teachers: z.array(z.string()), // teacher ids
});
export type SubjectSchema = z.infer<typeof subjectSchema>;

// CLASS SCHEMA
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required." }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required." }),
  gradeId: z.coerce.number().min(1, { message: "gradeId is required." }),
  supervisorId: z.coerce.string().optional(),
});
export type ClassSchema = z.infer<typeof classSchema>;

// TEACHER SCHEMA
export const teacherSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{9,13}$/, { message: "Invalid phone number!" })
    .optional()
    .or(z.literal("")),
  address: z.string(),
  bloodType: z
    .string()
    .regex(/(A|B|AB|O)[+-]/, { message: "Invalid blood type!" }),

  birthday: z.coerce.date({ message: "Birth date is required" }),
  sex: z.enum(["MALE", "FEMALE"], {
    message: "Sex is required",
  }),
  img: z.string().optional(),
  subjects: z
    .array(z.string())
    .max(3, {
      message: "A teacher can have at most 3 subjects",
    })
    .optional(), // Subject ids
  classes: z
    .array(z.string())
    .max(3, {
      message: "A teacher can have at most 3 classes",
    })
    .optional(),
});
export type TeacherSchema = z.infer<typeof teacherSchema>;

// STUDENT SCHEMA
export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{9,13}$/, { message: "Invalid phone number!" }),
  address: z.string().min(1, { message: "Address is required" }),
  bloodType: z
    .string()
    .regex(/(A|B|AB|O)[+-]/, { message: "Invalid blood type!" }),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum(["MALE", "FEMALE"], {
    message: "Sex is required",
  }),
  image: z.string().optional(),
  gradeId: z.coerce
    .number({ message: "The grade must be a number" })
    .min(1, { message: "Select a valid grade" }),
  classId: z.coerce
    .number({ message: "The grade must be a number" })
    .min(1, { message: "Select a valid class" }),
  parentId: z.string().min(1, { message: "parentId is required" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;
