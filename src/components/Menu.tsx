import { menuItems, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-2">
            {i.title}
          </span>
          {i.items?.map(
            (item) =>
              item.visible.includes(role) && (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-devanshSkyLight transition-all duration-100 ease-in"
                >
                  <Image src={item.icon} width={20} height={20} alt="" />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
