import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface HeaderProps {
  username: string;
  onLogout?: () => void;
}

export default function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold">Service Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {username}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onLogout}
          data-testid="button-logout"
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
