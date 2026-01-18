"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-card/50">
        <Sun className="w-4 h-4 text-muted-foreground" />
        <Moon className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border bg-card/50 hover:bg-card hover:border-border/80 transition-all"
      aria-label="Toggle theme"
    >
      <div
        className={`flex items-center justify-center w-5 h-5 rounded transition-all ${
          !isDark
            ? "bg-primary/20 border border-primary/50"
            : "bg-transparent"
        }`}
      >
        <Sun
          className={`w-3.5 h-3.5 transition-colors ${
            !isDark ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>
      <div
        className={`flex items-center justify-center w-5 h-5 rounded transition-all ${
          isDark
            ? "bg-primary/20 border border-primary/50"
            : "bg-transparent"
        }`}
      >
        <Moon
          className={`w-3.5 h-3.5 transition-colors ${
            isDark ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>
    </button>
  );
}
