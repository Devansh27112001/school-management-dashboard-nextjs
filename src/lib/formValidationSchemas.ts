import { z } from "zod";

// Subject schema
export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(4, {
    message: "Subject name must be at least 4 characters long",
  }),
  teachers: z.array(z.string()), // teacher ids
});
export type SubjectSchema = z.infer<typeof subjectSchema>;

// Class schema
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required." }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required." }),
  gradeId: z.coerce.number().min(1, { message: "gradeId is required." }),
  supervisorId: z.coerce.string().optional(),
});
export type ClassSchema = z.infer<typeof classSchema>;

// Teacher schema
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
    .min(8, { message: "Password must be at least 8 characters long!" }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{9,13}$/, { message: "Invalid phone number!" })
    .optional()
    .or(z.literal("")),
  address: z.string().optional(),
  bloodType: z
    .string()
    .regex(/(A|B|AB|O)[+-]/, { message: "Invalid blood type!" }),

  birthday: z.coerce.date({ message: "Birth date is required" }),
  sex: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Sex is required",
  }),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(), // Subject ids
  lessons: z.array(z.string()).optional(),
  classes: z.array(z.string()).optional(),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;
