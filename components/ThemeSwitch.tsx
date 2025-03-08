"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before using resolvedTheme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to unchecked (dark mode) during SSR, sync with resolvedTheme after mount
  const isLight = mounted ? resolvedTheme === "light" : false;

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "light" : "dark"); // Checked = light, unchecked = dark
  };

  return (
    <Switch
      checked={isLight}
      onCheckedChange={handleThemeChange}
      aria-label="Toggle theme"
    />
  );
}