"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

const SingleTeacherPage = () => {
  const { id: teacherId } = useParams();
  return (
    <div className="flex-1 p-4 px-2 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* LEFT SIDE: Top section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-devanshSky px-4 py-6 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={
                  "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                }
                alt=""
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Devansh Kansara</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium xl:gap-1">
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>November 2024</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex items-center gap-2">
                  <Image src={"/blood.png"} alt="" height={14} width={14} />
                  <span>+1 234 567 8900</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 bg-devanshPurple rounded-md">Small cards</div>
        </div>

        {/* LEFT SIDE: Bottom section */}
        <div className="">Schedule</div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3">Right side</div>
    </div>
  );
};

export default SingleTeacherPage;
