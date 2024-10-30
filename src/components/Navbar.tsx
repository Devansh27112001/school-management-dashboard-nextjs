import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex">
        <Image src={"/search.png"} width={14} height={14} alt="" />
        <input type="text" placeholder="Search..." />
      </div>
      {/* ICONS and USERS */}
      <div className="flex items-center gap-6">
        <div className="bg-white rounded-full size-7 flex items-center justify-center cursor-pointer">
          <Image src={"/message.png"} alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full size-7 flex items-center justify-center cursor-pointer">
          <Image src={"/announcement.png"} alt="" width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Devansh Kansara</span>
          <span className="text-[10px] text-gray-500 text-right">admin</span>
        </div>
        <Image
          src={"/avatar.png"}
          width={26}
          height={26}
          alt=""
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
