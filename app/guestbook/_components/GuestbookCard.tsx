"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

// Gradient color schemes with glassmorphism
const gradients = [
  { bg: "from-teal-600/40 to-cyan-700/50", border: "from-teal-400/50 via-cyan-400/30 to-transparent" },
  { bg: "from-blue-600/40 to-indigo-700/50", border: "from-blue-400/50 via-indigo-400/30 to-transparent" },
  { bg: "from-purple-600/40 to-violet-700/50", border: "from-purple-400/50 via-violet-400/30 to-transparent" },
  { bg: "from-pink-600/40 to-rose-700/50", border: "from-pink-400/50 via-rose-400/30 to-transparent" },
  { bg: "from-emerald-600/40 to-green-700/50", border: "from-emerald-400/50 via-green-400/30 to-transparent" },
];

interface GuestbookCardProps {
  entry: {
    id: string;
    content: string;
    createAt: Date;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
  index: number;
}

const GuestbookCard = memo(function GuestbookCard({ entry, index }: GuestbookCardProps) {
  const gradient = gradients[index % gradients.length];
  const date = new Date(entry.createAt);
  const formattedDate = format(date, "MMM dd");
  const relativeTime = formatDistanceToNow(date, { addSuffix: false });

  // Generate a consistent random rotation based on entry id
  const getRotation = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((hash % 7) - 3); // Range: -3 to 3 degrees
  };
  const rotation = getRotation(entry.id);

  return (
    <motion.div
      className="relative rounded-2xl p-[1px] group"
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.2 } }}
    >
      {/* Gradient border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient.border} opacity-60`} />

      {/* Card content */}
      <div className={`relative bg-gradient-to-br ${gradient.bg} backdrop-blur-xl rounded-2xl p-4 flex flex-col justify-between h-full`}>
        {/* Top shine effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute top-0 left-4 right-4 h-12 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" />

        {/* Decorative quote marks */}
        <div className="absolute top-3 left-4 opacity-30">
          <Quote className="w-6 h-6 text-white" />
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-300" />

      {/* Content */}
      <p className="text-white text-base font-medium leading-relaxed mb-4 relative z-10">
        &ldquo;{entry.content}&rdquo;
      </p>

      {/* User info */}
      <div className="flex items-center gap-3 relative z-10">
        {entry.user.image ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src={entry.user.image}
              alt={entry.user.name || "User"}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
            <span className="text-white font-medium text-sm">
              {entry.user.name?.charAt(0) || "?"}
            </span>
          </div>
        )}
        <div>
          <p className="text-white font-medium">
            {entry.user.name || "Anonymous"}
          </p>
          <p className="text-white/60 text-sm">
            {formattedDate} · {relativeTime} ago
          </p>
        </div>
      </div>
      </div>
    </motion.div>
  );
});

export default GuestbookCard;
