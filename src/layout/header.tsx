import { Moon, Sun, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { Link } from 'react-router-dom';

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
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function refreshPage() {
  location.reload();
}

function RefreshPageButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <RefreshCcw className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reset your current configuration and you will lose all
            your current parameters.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={refreshPage}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const Header = () => {
  return (
    <header className="top-0 left-0 right-0 p-4 shadow-sm bg-inherit sticky z-10 border-b">
      <div className="mx-auto flex justify-between">
        <div className="flex items-center gap-6">
          <Link to="/">
            <h1 className="text-2xl font-bold text-start">Script Generator</h1>
          </Link>
          <Button variant="ghost">
            <a href="https://github.com/Script-Generator/FILA1_Script_Generator#readme">
              <p>Documentation</p>
            </a>
          </Button>
          <Button variant="ghost">
            <Link to="/visualisation">
              <p>Visualisation</p>
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <RefreshPageButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
