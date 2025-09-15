import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("theme");
      if (stored) {
        const isStoredDark = stored === "dark";
        setIsDark(isStoredDark);
        document.documentElement.classList.toggle("light", !isStoredDark);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle("light", !newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="px-3 py-2 text-sm rounded-xl glass-card hover:scale-105 transition-all"
      data-testid="button-theme-toggle"
    >
      {isDark ? "🌓" : "🌙"}
    </Button>
  );
}
