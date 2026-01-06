"use client";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { ChevronUp, BookOpen, Archive, FolderOpen, MessageSquare } from "lucide-react";
import { MonogramLogo } from "./Logo";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

// Large cards with images (left side)
const featuredLinks = [
  {
    label: "Guestbook",
    href: "/guestbook",
    description: "Let me know you were here",
    image: "/images/guestbook-bg.jpg",
    fallbackGradient: "from-purple-600 to-pink-500"
  },
  {
    label: "Bucket List",
    href: "/bucket-list",
    description: "Things to do at least once in my life",
    image: "/images/bucket-list-bg.jpg",
    fallbackGradient: "from-blue-600 to-cyan-500"
  },
];

// Smaller items (right side)
const quickLinks = [
  { label: "Archive", href: "/archive", icon: Archive, description: "All blog posts" },
  { label: "Category", href: "/category", icon: FolderOpen, description: "Browse by topic" },
];

// All unique links for mobile menu
const allLinks = [
  ...mainLinks,
  { label: "Guestbook", href: "/guestbook" },
  { label: "Bucket List", href: "/bucket-list" },
  { label: "Archive", href: "/archive" },
  { label: "Category", href: "/category" },
];
// Note: Blog is already included via ...mainLinks spread

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Unified function to check if a link is active
  const isLinkActive = (href) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath?.startsWith(href);
  };

  // Check if any "More" link is active
  const moreHrefs = ["/guestbook", "/bucket-list", "/archive", "/category"];
  const isMoreActive = moreHrefs.some((href) => isLinkActive(href));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
      {/* Logo - Left */}
      <MonogramLogo size={36} />

      {/* Floating Pill Navbar - Center */}
      <nav className="hidden md:flex items-center bg-card/90 backdrop-blur-md rounded-full px-2 py-1.5 border border-border/50 shadow-lg relative">
        {mainLinks.map((link) => {
          const isActive = isLinkActive(link.href);

          return (
            <div key={link.href} className="relative">
              {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-muted-foreground/80 rounded-full z-10" />
              )}
              <Link
                href={link.href}
                className={classnames(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  {
                    "bg-muted/80 text-foreground": isActive,
                    "text-muted-foreground hover:text-foreground hover:bg-muted/50": !isActive,
                  }
                )}
              >
                {link.label}
              </Link>
            </div>
          );
        })}

        {/* More Dropdown */}
        <div
          className="relative"
          ref={moreMenuRef}
          onMouseEnter={() => setMoreMenuOpen(true)}
          onMouseLeave={() => setMoreMenuOpen(false)}
        >
          {isMoreActive && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-muted-foreground/80 rounded-full z-10" />
          )}
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className={classnames(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1",
              {
                "bg-muted/80 text-foreground": isMoreActive || moreMenuOpen,
                "text-muted-foreground hover:text-foreground hover:bg-muted/50": !isMoreActive && !moreMenuOpen,
              }
            )}
          >
            More
            <ChevronUp
              className={classnames("w-4 h-4 transition-transform duration-200", {
                "rotate-180": !moreMenuOpen,
              })}
            />
          </button>

          {/* Dropdown Menu */}
          {moreMenuOpen && (
            <>
              {/* Invisible bridge to prevent gap */}
              <div className="absolute top-full left-0 right-0 h-4" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-card/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl overflow-hidden">
              <div className="p-4 flex gap-4">
                {/* Left: Featured cards with images */}
                <div className="flex gap-4">
                  {featuredLinks.map((link) => {
                    const isActive = isLinkActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={classnames(
                          "relative w-52 h-44 rounded-2xl overflow-hidden group transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-purple-500/30 hover:shadow-xl",
                          {
                            "ring-2 ring-purple-500": isActive,
                          }
                        )}
                      >
                        {/* Background - gradient fallback or image */}
                        <div
                          className={classnames(
                            "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110",
                            `bg-gradient-to-br ${link.fallbackGradient}`
                          )}
                          style={link.image ? { backgroundImage: `url(${link.image})` } : {}}
                        />
                        {/* Dark overlay - fades on hover */}
                        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {/* Highlight border on hover */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-colors duration-300" />
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-white font-semibold text-xl">{link.label}</h3>
                          <p className="text-white/70 text-sm mt-1">{link.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Right: Quick links */}
                <div className="flex flex-col gap-2 min-w-[180px] justify-center">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = isLinkActive(link.href);
                    return (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={classnames(
                          "flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200",
                          {
                            "bg-muted/80 text-foreground": isActive,
                            "text-muted-foreground hover:bg-muted/50 hover:text-foreground": !isActive,
                          }
                        )}
                      >
                        <div className="w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{link.label}</div>
                          <div className="text-xs text-muted-foreground">{link.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            </>
          )}
        </div>

        {/* Auth Button in Pill */}
        {status === "authenticated" && (
          <Link
            href="/api/auth/signout"
            className="ml-1 px-4 py-2 rounded-full text-sm font-medium bg-foreground/10 text-foreground hover:bg-foreground/20 transition-all duration-200"
          >
            Sign out
          </Link>
        )}

        {status === "unauthenticated" && (
          <Link
            href="/api/auth/signin"
            className="ml-1 px-4 py-2 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Right Side - Avatar or Empty */}
      <div className="flex items-center gap-3">
        {status === "authenticated" && (
          <div className="hidden md:block avatar">
            <div className="w-8 rounded-full ring-2 ring-border">
              <img src={session.user?.image} alt="Avatar" />
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-card/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg md:hidden">
          <ul className="p-4 space-y-2">
            {allLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      {
                        "bg-muted/80 text-foreground": isActive,
                        "text-muted-foreground hover:bg-muted/50": !isActive,
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
                <li className="pt-2 border-t border-border">
                  <div className="flex items-center gap-3 px-4 py-2 text-muted-foreground">
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
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign out
                  </Link>
                </li>
              </>
            )}

            {status === "unauthenticated" && (
              <li className="pt-2 border-t border-border">
                <Link
                  href="/api/auth/signin"
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-center bg-foreground text-background"
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
