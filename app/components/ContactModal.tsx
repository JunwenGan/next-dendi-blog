"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, MessageSquare } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const email = "junonegan@gmail.com";
  const calendarLink = "https://calendly.com"; // Update with your actual calendar link

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 md:pb-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Handle bar */}
              <div className="flex justify-center pt-3">
                <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <h2
                  className="text-2xl text-foreground"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Get in touch
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 space-y-4">
                {/* Two cards */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Book a Call */}
                  <Link
                    href={calendarLink}
                    target="_blank"
                    className="group p-4 rounded-xl border border-border bg-background hover:border-border/80 hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-muted/80 transition-colors">
                      <Calendar className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">Book a Call</h3>
                    <p className="text-sm text-muted-foreground">Schedule a 30-min chat</p>
                  </Link>

                  {/* Email Me */}
                  <Link
                    href={`mailto:${email}`}
                    className="group p-4 rounded-xl border border-border bg-background hover:border-border/80 hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-muted/80 transition-colors">
                      <Mail className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">Email Me</h3>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </Link>
                </div>

                {/* Message input */}
                <Link
                  href="/guestbook"
                  className="group flex items-center justify-between p-4 rounded-xl border border-dashed border-border hover:border-border/80 hover:bg-muted/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                      <MessageSquare className="w-5 h-5 text-accent-blue" />
                    </div>
                    <span className="text-foreground">Or write me a message here</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Tap to open</span>
                </Link>

                {/* Social links */}
                <div className="pt-2">
                  <p className="text-xs text-center text-muted-foreground uppercase tracking-widest mb-4">
                    Connect on Socials
                  </p>
                  <div className="flex justify-center gap-6">
                    <Link
                      href="https://linkedin.com/in/junwen-gan-b0336b339"
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FaLinkedinIn className="w-5 h-5" />
                    </Link>
                    <Link
                      href="https://github.com/JunwenGan"
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                    </Link>
                    {/* <Link
                      href="https://twitter.com/your-profile"
                      target="_blank"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
