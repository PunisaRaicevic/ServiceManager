import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

interface BackButtonProps {
  to: string;
  label?: string;
}

export default function BackButton({ to, label = "Back" }: BackButtonProps) {
  const [, setLocation] = useLocation();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocation(to)}
      data-testid="button-back"
      className="gap-2 -ml-2"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
