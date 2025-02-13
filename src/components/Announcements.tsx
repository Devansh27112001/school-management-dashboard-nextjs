import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const announcements = [
  {
    id: 1,
    title: "About 4A Math Test",
    date: "2025-01-01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At provident, consequuntur facere obcaecati nam voluptatum tempore modi.",
  },
  {
    id: 2,
    title: "About 3A Math Test",
    date: "2025-01-01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At provident, consequuntur facere obcaecati nam voluptatum tempore modi.",
  },
  {
    id: 3,
    title: "About 3B Math Test",
    date: "2025-01-01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At provident, consequuntur facere obcaecati nam voluptatum tempore modi.",
  },
];

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    admin: {},
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      OR: [
        { classId: null },
        { class: roleConditions[role as keyof typeof roleConditions] || {} },
      ],
    },
  });
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcemments</h1>
        <span className="tet-xs text-gray-400">View all</span>
        <div className="flex flex-col gap-4 mt-4">
          {data[0] && (
            <div className="bg-devanshSkyLight rounded-md p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{data[0].title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                  {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {data[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
