import { Card } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";

type TaskStatus = "pending" | "in_progress" | "completed";

interface TaskCardProps {
  taskId: string;
  description: string;
  clientName: string;
  status: TaskStatus;
  createdAt: Date;
  onClick?: () => void;
}

export default function TaskCard({
  taskId,
  description,
  clientName,
  status,
  createdAt,
  onClick,
}: TaskCardProps) {
  return (
    <Card
      className="p-5 hover-elevate active-elevate-2 cursor-pointer overflow-visible"
      onClick={onClick}
      data-testid={`card-task-${taskId}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-medium flex-1" data-testid={`text-task-description-${taskId}`}>
          {description}
        </h3>
        <StatusBadge status={status} />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span data-testid={`text-client-name-${taskId}`}>{clientName}</span>
        <span>•</span>
        <span className="text-xs" data-testid={`text-created-date-${taskId}`}>
          {format(createdAt, "MMM d, yyyy")}
        </span>
      </div>
    </Card>
  );
}
