"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";

const messageSchema = z.object({
  content: z.string().min(1, "Message is required").max(500, "Message too long"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface MessageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (entry: any) => void;
  userName?: string | null;
  userImage?: string | null;
}

export default function MessageForm({
  isOpen,
  onClose,
  onSuccess,
  userName,
  userImage,
}: MessageFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/guestbook", data);
      onSuccess(response.data);
      reset();
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to post message:", error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Gradient border wrapper */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-blue-500/30 p-[1px]" />

              {/* Modal content */}
              <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
                {/* Top shine effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  {userImage ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/50 ring-offset-2 ring-offset-slate-900">
                      <img
                        src={userImage}
                        alt={userName || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-purple-500/50 ring-offset-2 ring-offset-slate-900">
                      <span className="text-white font-semibold text-lg">
                        {userName?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Leave your mark
                    </h2>
                    <p className="text-white/60 text-sm">
                      Posting as {userName || "Anonymous"}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit}>
                  <div className="relative">
                    <textarea
                      {...register("content")}
                      placeholder="Say something nice..."
                      className="w-full min-h-[140px] p-4 bg-slate-800/50 border border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder:text-white/40 transition-all"
                      disabled={isSubmitting}
                      maxLength={500}
                    />
                    {/* Character count */}
                    <div className="absolute bottom-3 right-3 text-xs text-white/30">
                      {500} max
                    </div>
                  </div>
                  {errors.content && (
                    <p className="text-sm text-red-400 mt-2">
                      {errors.content.message}
                    </p>
                  )}

                  <div className="flex justify-end mt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Posting..." : "Post Message"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
