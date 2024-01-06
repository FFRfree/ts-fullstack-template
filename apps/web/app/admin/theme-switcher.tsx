import { Switch } from "@web/components/ui/switch";
import { useTheme } from "next-themes";
import * as React from "react";
import { Moon, Sun } from "lucide-react";

export interface IThemeSwitcherProps {}

export function ThemeSwitcher(props: IThemeSwitcherProps) {
  const { theme, themes, setTheme } = useTheme();

  return (
    <span className="flex ">
      {theme === "dark" ? <Moon /> : <Sun />}
      <Switch
        className="ml-1"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </span>
  );
}
