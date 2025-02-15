import { auth } from "@clerk/nextjs/server";

const { userId: currentUserId, sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role: string })?.role;

export { currentUserId, role };

const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfweek = today;

  // If day of the week is 0 (Sunday), then the start of the week will be the next day.
  if (dayOfWeek === 0) {
    startOfweek.setDate(today.getDate() + 1);
  }

  // If day of the week is 6 (Saturday), then the start of the week will be the day after tomorrow.
  if (dayOfWeek === 6) {
    startOfweek.setDate(today.getDate() + 2);
  } else {
    startOfweek.setDate(today.getDate() - (dayOfWeek - 1));
  }

  startOfweek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfweek);
  endOfWeek.setDate(startOfweek.getDate() + 4);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfweek, endOfWeek };
};

export const adjustScheduleToCurrentWeek = (
  lessons: {
    title: string;
    start: Date;
    end: Date;
  }[]
): { title: string; start: Date; end: Date } => {
  const { startOfweek, endOfWeek } = currentWorkWeek();
  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustStartDate = new Date(startOfweek);

    adjustStartDate.setDate(startOfweek.getDate() + daysFromMonday);

    const adjustEndDate = new Date(startOfweek);
    adjustEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustStartDate,
      end: adjustEndDate,
    };
  });
};
