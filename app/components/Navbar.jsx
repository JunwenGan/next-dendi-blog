"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AiFillFilter,
  AiFillFolder,
  AiFillHome,
  AiOutlineMenu,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import classnames from "classnames";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed top-0 left-0 w-full flex items-center mx-auto px-4 h-12 justify-between bg-gray-200 bg-transparent">
      <AiOutlineMenu
        size={20}
        className="block md:hidden"
        onClick={handleNav}
      />
      <h1 className="w-full font-bold text-2xl pl-4 hidden md:block text-white">
        Dendi Blog
      </h1>
      <NavLinks />

      <div
        className={
          nav ? "fixed left-0 top-14 w-[60%] bg-gray-800" : "fixed left-[-100%]"
        }
      >
        <ul className="p-4 text-white text-1xl">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Archive</li>
          <li className="p-4 border-b border-gray-600">Category</li>
          <li className="p-4">About</li>
        </ul>
      </div>
    </div>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Home",
      href: "/",
      icon: AiFillHome,
    },
    {
      label: "Archive",
      href: "/archive",
      icon: AiFillFolder,
    },
    {
      label: "Category",
      href: "/category",
      icon: AiFillFilter,
    },
    {
      label: "About",
      href: "/about",
      icon: AiOutlineInfoCircle,
    },
  ];
  return (
    <ul className="hidden md:flex text-white">
      {links.map((link) => (
        <li key={link.href} className="p-4 flex items-center">
          <link.icon
            color="white"
            className={classnames({
              "!text-zinc-900": link.href === currentPath,
              "mr-2": true,
              "nav-link": true,
            })}
          ></link.icon>
          <Link
            href={link.href}
            className={classnames({
              "!text-zinc-900": link.href === currentPath,
              "nav-link": true,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
