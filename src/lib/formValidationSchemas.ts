import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(4, {
    message: "Subject name must be at least 4 characters long",
  }),
  teachers: z.array(z.string()), // teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;
