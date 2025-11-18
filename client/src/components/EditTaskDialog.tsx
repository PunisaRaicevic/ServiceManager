import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n";
import type { Task, InsertTask } from "@shared/schema";
import type { RecurrencePattern } from "@/lib/recurringUtils";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

export default function EditTaskDialog({
  open,
  onOpenChange,
  task,
}: EditTaskDialogProps) {
  const t = useTranslation();
  const { toast } = useToast();
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "normal");
  const [dueDate, setDueDate] = useState(
    task.dueDate && typeof task.dueDate === 'string' ? task.dueDate : ""
  );
  const [status, setStatus] = useState(task.status || "pending");
  const [taskType, setTaskType] = useState<"one-time" | "recurring">(
    (task.taskType as "one-time" | "recurring") || "one-time"
  );
  const [recurrencePattern, setRecurrencePattern] = useState<RecurrencePattern>(
    (task.recurrencePattern as RecurrencePattern) || "none"
  );
  const [recurrenceInterval, setRecurrenceInterval] = useState(
    task.recurrenceInterval || 1
  );

  useEffect(() => {
    if (open && task) {
      setDescription(task.description || "");
      setPriority(task.priority || "normal");
      setDueDate(task.dueDate && typeof task.dueDate === 'string' ? task.dueDate : "");
      setStatus(task.status || "pending");
      
      const currentTaskType = (task.taskType as "one-time" | "recurring") || "one-time";
      setTaskType(currentTaskType);
      
      if (currentTaskType === "one-time") {
        // One-time tasks should have null recurrence values
        setRecurrencePattern("none");
        setRecurrenceInterval(1);
      } else {
        // Recurring task - set valid defaults if needed
        const currentPattern = (task.recurrencePattern as RecurrencePattern) || "none";
        if (currentPattern === "none") {
          setRecurrencePattern("weekly");
        } else {
          setRecurrencePattern(currentPattern);
        }
        setRecurrenceInterval(task.recurrenceInterval || 1);
      }
    }
  }, [open, task]);

  type TaskUpdateData = Partial<Pick<InsertTask, 'description' | 'priority' | 'status' | 'dueDate' | 'taskType' | 'recurrencePattern' | 'recurrenceInterval'>>;

  const updateTaskMutation = useMutation({
    mutationFn: async (taskData: TaskUpdateData) => {
      return await apiRequest("PATCH", `/api/tasks/${task.id}`, taskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks", task.id] });
      toast({
        description: t.tasks.updateSuccess,
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        description: error.message || "Failed to update task",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    // Validate description
    if (!description.trim()) {
      toast({
        description: t.common.required,
        variant: "destructive",
      });
      return;
    }

    // Validate recurring task fields
    if (taskType === "recurring") {
      if (recurrencePattern === "none" || !recurrencePattern) {
        toast({
          description: t.tasks.selectRecurrencePattern,
          variant: "destructive",
        });
        return;
      }
      if (!recurrenceInterval || recurrenceInterval < 1) {
        toast({
          description: t.tasks.recurrenceIntervalMinimum,
          variant: "destructive",
        });
        return;
      }
    }

    const taskData: TaskUpdateData = {
      description: description.trim(),
      priority: priority || "normal",
      dueDate: dueDate || null,
      status: status || "pending",
      taskType,
      recurrencePattern: taskType === "recurring" ? recurrencePattern : null,
      recurrenceInterval: taskType === "recurring" ? recurrenceInterval : null,
    };

    updateTaskMutation.mutate(taskData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.tasks.editTask}</DialogTitle>
          <DialogDescription>
            {t.tasks.editTaskDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-task-description">
              {t.tasks.description} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-task-description"
              placeholder={t.tasks.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-edit-task-description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-task-priority">{t.tasks.priority}</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="edit-task-priority" data-testid="select-edit-task-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t.tasks.priorities.low}</SelectItem>
                  <SelectItem value="normal">{t.tasks.priorities.normal}</SelectItem>
                  <SelectItem value="high">{t.tasks.priorities.high}</SelectItem>
                  <SelectItem value="urgent">{t.tasks.priorities.urgent}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-task-status">{t.tasks.status}</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="edit-task-status" data-testid="select-edit-task-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">{t.tasks.statuses.pending}</SelectItem>
                  <SelectItem value="in_progress">{t.tasks.statuses.in_progress}</SelectItem>
                  <SelectItem value="completed">{t.tasks.statuses.completed}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-task-due-date">{t.tasks.dueDate}</Label>
            <Input
              id="edit-task-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              data-testid="input-edit-task-due-date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-task-type">{t.tasks.taskType}</Label>
            <Select 
              value={taskType} 
              onValueChange={(value: "one-time" | "recurring") => {
                setTaskType(value);
                if (value === "one-time") {
                  // Clear recurrence fields when switching to one-time
                  setRecurrencePattern("none");
                  setRecurrenceInterval(1);
                } else if (value === "recurring" && recurrencePattern === "none") {
                  // Auto-set valid pattern when switching to recurring
                  setRecurrencePattern("weekly");
                  setRecurrenceInterval(1);
                }
              }}
            >
              <SelectTrigger id="edit-task-type" data-testid="select-edit-task-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">{t.tasks.types['one-time']}</SelectItem>
                <SelectItem value="recurring">{t.tasks.types.recurring}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {taskType === "recurring" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-recurrence-pattern">{t.tasks.pattern}</Label>
                  <Select 
                    value={recurrencePattern} 
                    onValueChange={(value: RecurrencePattern) => setRecurrencePattern(value)}
                  >
                    <SelectTrigger id="edit-recurrence-pattern" data-testid="select-edit-recurrence-pattern">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">{t.tasks.recurrencePatterns.weekly}</SelectItem>
                      <SelectItem value="monthly">{t.tasks.recurrencePatterns.monthly}</SelectItem>
                      <SelectItem value="quarterly">{t.tasks.recurrencePatterns.quarterly}</SelectItem>
                      <SelectItem value="semi-annual">{t.tasks.recurrencePatterns['semi-annual']}</SelectItem>
                      <SelectItem value="yearly">{t.tasks.recurrencePatterns.yearly}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-recurrence-interval">{t.tasks.recurrenceInterval}</Label>
                  <Input
                    id="edit-recurrence-interval"
                    type="number"
                    min="1"
                    max="52"
                    value={recurrenceInterval}
                    onChange={(e) => setRecurrenceInterval(parseInt(e.target.value) || 1)}
                    data-testid="input-edit-recurrence-interval"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updateTaskMutation.isPending}
            data-testid="button-cancel-edit"
          >
            {t.common.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateTaskMutation.isPending}
            data-testid="button-save-edit"
          >
            {updateTaskMutation.isPending ? t.common.loading : t.common.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
