import { menuItems } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="">
      {menuItems.map((i) => (
        <div className="" key={i.title}>
          <span className="">{i.title}</span>
          {i.items?.map((item) => (
            <Link key={item.label} href={item.href}>
              <Image src={item.icon} width={20} height={20} alt="" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
