import {
  Announcement,
  Assignment,
  Class,
  Exam,
  Lesson,
  Parent,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";

export type searchParamsType = Promise<{
  [key: string]: string | undefined;
}>;

export type AnnouncementList = Announcement & { class: Class };
export type AssignmentsList = Assignment & {
  lesson: { subject: Subject; teacher: Teacher; class: Class };
};
export type ClassesList = Class & { supervisor: Teacher };
export type EventsList = Event & { class: Class };
export type ExamsList = Exam & {
  lesson: { subject: Subject; teacher: Teacher; class: Class };
};

export type LessonsList = Lesson & {
  class: Class;
  teacher: Teacher;
  subject: Subject;
};

export type ParentsList = Parent & { students: Student[] };
export type ResultsList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

export type StudentsList = Student & { Class: Class };
export type SubjectsList = Subject & { teacher: Teacher[] };
export type TeachersList = Teacher & { subjects: Subject[]; classes: Class[] };
