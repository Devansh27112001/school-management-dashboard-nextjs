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
      <div className="">
        <div className=""></div>
      </div>
    </div>
  );
};

export default Navbar;
