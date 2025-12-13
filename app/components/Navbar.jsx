"use client";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { MonogramLogo } from "./Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Guestbook", href: "/guestbook" },
  { label: "Archive", href: "/archive" },
  { label: "Category", href: "/category" },
];

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Unified function to check if a link is active
  const isLinkActive = (href) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath?.startsWith(href);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
      {/* Logo - Left */}
      <MonogramLogo size={36} />

      {/* Floating Pill Navbar - Center */}
      <nav className="hidden md:flex items-center bg-gray-900/90 backdrop-blur-md rounded-full px-2 py-1.5 border border-gray-700/50 shadow-lg relative">
        {links.map((link) => {
          // Active state: exact match for home, startsWith for other routes
          const isActive = isLinkActive(link.href);
          
          return (
            <div key={link.href} className="relative">
              {/* Top Indicator Tab - appears above active link */}
              {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-gray-400/80 rounded-full z-10" />
              )}
              <Link
                href={link.href}
                className={classnames(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  {
                    "bg-gray-700/80 text-white": isActive,
                    "text-gray-300 hover:text-white hover:bg-gray-800/50": !isActive,
                  }
                )}
              >
                {link.label}
              </Link>
            </div>
          );
        })}

        {/* Auth Button in Pill */}
        {status === "authenticated" && (
          <Link
            href="/api/auth/signout"
            className="ml-1 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
          >
            Sign out
          </Link>
        )}

        {status === "unauthenticated" && (
          <Link
            href="/api/auth/signin"
            className="ml-1 px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-900 hover:bg-gray-200 transition-all duration-200"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Right Side - Avatar or Empty */}
      <div className="flex items-center gap-3">
        {status === "authenticated" && (
          <div className="hidden md:block avatar">
            <div className="w-8 rounded-full ring-2 ring-gray-600">
              <img src={session.user?.image} alt="Avatar" />
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-lg md:hidden">
          <ul className="p-4 space-y-2">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      {
                        "bg-gray-700/80 text-white": isActive,
                        "text-gray-300 hover:bg-gray-800/50": !isActive,
                      }
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {status === "authenticated" && (
              <>
                <li className="pt-2 border-t border-gray-700">
                  <div className="flex items-center gap-3 px-4 py-2 text-gray-300">
                    <div className="avatar">
                      <div className="w-6 rounded-full">
                        <img src={session.user?.image} alt="Avatar" />
                      </div>
                    </div>
                    <span className="text-sm">{session.user?.name}</span>
                  </div>
                </li>
                <li>
                  <Link
                    href="/api/auth/signout"
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-gray-800/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign out
                  </Link>
                </li>
              </>
            )}

            {status === "unauthenticated" && (
              <li className="pt-2 border-t border-gray-700">
                <Link
                  href="/api/auth/signin"
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-center bg-white text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
