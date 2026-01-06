"use client";

import Link from "next/link";
import { MonogramLogo } from "./Logo";
import { Github, Linkedin, Twitter } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const generalLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Archive", href: "/archive" },
    { label: "Category", href: "/category" },
  ];

  const specificLinks = [
    { label: "Guestbook", href: "/guestbook" },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/JunwenGan",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/junwen-gan-b0336b339",
      icon: Linkedin,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
    },
  ];

  return (
    <footer className="relative bg-background border-t border-border/50">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 pt-12 md:pt-16 pb-4 md:pb-6 space-y-8">
        {/* First Row: Brand Introduction & Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          {/* Brand/Introduction Section - Left */}
          <div className="flex-1 space-y-4 max-w-md">
            <MonogramLogo size={40} />
            <p className="text-muted-foreground text-sm leading-relaxed">
              I&apos;m Frederick - a full-stack developer, freelancer & problem
              solver. Thanks for checking out my site!
            </p>
          </div>

          {/* Navigation Links & Social Media - Right */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* General Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                General
              </h3>
              <nav className="flex flex-col gap-3">
                {generalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-muted-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Specifics Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Specifics
              </h3>
              <nav className="flex flex-col gap-3">
                {specificLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-muted-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* More Navigation - Empty for now, can add more links later */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                More
              </h3>
            </div>
          </div>
        </div>

        {/* Second Row: Copyright & Legal Links (Left) + Social Media Icons (Right) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 pb-0 md:pb-0 border-t border-border/50">
          {/* Copyright & Legal Links - Left */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <p>© {currentYear} Frederick. All rights reserved.</p>
            <Link
              href="/privacy"
              className="hover:text-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground/80 transition-colors"
            >
              Terms of Use
            </Link>
          </div>

          {/* Theme Toggle & Social Media Icons - Right */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
