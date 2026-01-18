"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, ExternalLink, Calendar, Globe, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { useState } from "react";
import DecorativeSideBars from "../components/DecorativeSideBars";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LinksPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("junonegan@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background relative">
      <DecorativeSideBars />

      <div className="container mx-auto px-8 md:px-16 lg:px-20 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            NETWORK
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-foreground"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Connect With{" "}
            <span
              className="italic bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              Me
            </span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="bg-card/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border/50">
                    <Image
                      src="/images/me.jpg"
                      alt="Frederick"
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                </div>
              </div>

              {/* Name */}
              <h2
                className="text-2xl text-center text-foreground mb-3"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Frederick Gan
              </h2>

              {/* Badges */}
              <div className="flex justify-center gap-2 mb-6">
                <span className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground">
                  Developer
                </span>
                <span className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground">
                  Remote
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-border/50 my-6" />

              {/* Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Melbourne, Australia</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">junonegan@gmail.com</span>
                </div>
              </div>

              {/* Book a Call Button */}
              <button
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground hover:bg-muted/50 transition-colors mb-4 cursor-not-allowed opacity-60"
                disabled
                title="Coming soon"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Book a Call</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Bottom Buttons */}
              <div className="flex gap-3">
                <Link
                  href="/"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </Link>
                <button
                  onClick={copyEmail}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Email
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Links */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
            {/* Code & Craft Section */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  CODE & CRAFT
                </span>
                <div className="flex-1 border-t border-dashed border-border/50" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub */}
                <Link
                  href="https://github.com/JunwenGan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                    <FaGithub className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">GitHub</h3>
                    <p className="text-sm text-muted-foreground">@JunwenGan</p>
                  </div>
                </Link>

                {/* Guestbook */}
                <Link
                  href="/guestbook"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                    <HiOutlineBookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Guestbook</h3>
                    <p className="text-sm text-muted-foreground">Leave a mark</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Connect Section */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  CONNECT
                </span>
                <div className="flex-1 border-t border-dashed border-border/50" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/in/junwen-gan-b0336b339/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                    <FaLinkedinIn className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">in/junwen-gan</p>
                  </div>
                </Link>

                {/* Twitter/X */}
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                    <FaXTwitter className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Twitter / X</h3>
                    <p className="text-sm text-muted-foreground">@frederick</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
