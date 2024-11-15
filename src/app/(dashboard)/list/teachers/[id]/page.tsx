"use client";
import { useParams } from "next/navigation";

const SingleTeacherPage = () => {
  const { id: teacherId } = useParams();
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">Left side</div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3">Right side</div>
    </div>
  );
};

export default SingleTeacherPage;
