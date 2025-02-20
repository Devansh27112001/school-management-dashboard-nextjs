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

export type classSchema = z.infer<typeof classSchema>;
