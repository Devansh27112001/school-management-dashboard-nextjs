import prisma from "@/lib/prisma";
import Image from "next/image";

interface UserCardProps {
  type: "admin" | "student" | "parent" | "teacher";
}

const UserCard = async ({ type }: UserCardProps) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    student: prisma.student,
    parent: prisma.parent,
    teacher: prisma.teacher,
  };
  const data = await modelMap[type].count();
  return (
    <div className="rounded-2xl odd:bg-devanshPurple even:bg-devanshYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600 font-medium">
          2024/05
        </span>
        <Image alt="" src={"/more.png"} height={20} width={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
