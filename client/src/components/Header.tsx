import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";

export default function Header() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      queryClient.clear();
      setLocation('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold">Service Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground" data-testid="text-username">
          {user?.fullName || user?.username || 'User'}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
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
