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
import type { Task } from "@shared/schema";

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

  useEffect(() => {
    if (open && task) {
      setDescription(task.description || "");
      setPriority(task.priority || "normal");
      setDueDate(task.dueDate && typeof task.dueDate === 'string' ? task.dueDate : "");
      setStatus(task.status || "pending");
    }
  }, [open, task]);

  const updateTaskMutation = useMutation({
    mutationFn: async (taskData: any) => {
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
    onError: (error: any) => {
      toast({
        description: error.message || "Failed to update task",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!description.trim()) {
      toast({
        description: t.common.required,
        variant: "destructive",
      });
      return;
    }

    updateTaskMutation.mutate({
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      status,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
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
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
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
