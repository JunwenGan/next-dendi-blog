"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface SignInCardProps {
  onWriteClick: () => void;
}

const SignInCard = memo(function SignInCard({ onWriteClick }: SignInCardProps) {
  return (
    <motion.div
      className="border-2 border-dashed border-border/50 rounded-2xl p-4 bg-card/30 backdrop-blur-sm flex flex-col justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title */}
      <h3
        className="text-2xl text-foreground mb-2"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
          fontStyle: "italic",
        }}
      >
        &ldquo;Join the wall...&rdquo;
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6">
        Sign in to pin your message to this board forever.
      </p>

      {/* Button */}
      <Button
        onClick={onWriteClick}
        variant="outline"
        className="w-full justify-center gap-2 border-border hover:bg-muted"
      >
        <Pencil className="w-4 h-4" />
        Write a message...
      </Button>
    </motion.div>
  );
});

export default SignInCard;
