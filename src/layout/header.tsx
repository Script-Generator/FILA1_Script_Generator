import { Moon, Sun, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const handleResetClick = () => {
    location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-4 shadow-sm z-50 bg-inherit">
      <div className="mx-auto flex justify-between">
        <div className="flex items-center gap-6">
          <a href="/">
            <h1 className="text-2xl font-bold text-start">Script Generator</h1>
          </a>
          <a href="https://github.com/Script-Generator/FILA1_Script_Generator">
            <p>Documentation</p>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleResetClick}>
            <RefreshCcw />
          </Button>
          {ModeToggle()}
        </div>
      </div>
    </header>
  );
};

export default Header;
