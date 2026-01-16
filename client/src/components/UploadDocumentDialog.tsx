import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2, FileText, Image, File } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n";
import { uploadImage } from "@/lib/supabase";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadDocumentDialog({
  open,
  onOpenChange,
}: UploadDocumentDialogProps) {
  const t = useTranslation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createDocumentMutation = useMutation({
    mutationFn: async (documentData: { name: string; type: string; url: string }) => {
      return await apiRequest("POST", "/api/documents", documentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      toast({
        description: t.documents.uploadSuccess || "Dokument uspešno otpremljen",
      });
      handleClose();
    },
    onError: (error: Error) => {
      toast({
        description: error.message || t.documents.uploadError || "Greška pri otpremanju dokumenta",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    setName("");
    setFile(null);
    onOpenChange(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (!name) {
        setName(droppedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!name) {
        setName(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith("image/")) return <Image className="h-8 w-8 text-blue-500" />;
    if (type === "application/pdf") return <FileText className="h-8 w-8 text-red-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const getFileType = (file: File): string => {
    const type = file.type;
    if (type.startsWith("image/")) return "image";
    if (type === "application/pdf") return "pdf";
    if (type.startsWith("text/")) return "text";
    return file.name.split(".").pop() || "file";
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        description: t.documents.selectFile || "Izaberite fajl za otpremanje",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim()) {
      toast({
        description: t.common.required,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file, "documents");
      const fileType = getFileType(file);
      
      createDocumentMutation.mutate({
        name: name.trim(),
        type: fileType,
        url,
      });
    } catch (error: any) {
      toast({
        description: error.message || t.documents.uploadError || "Greška pri otpremanju",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const isSubmitting = uploading || createDocumentMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.storage.uploadDocument}</DialogTitle>
          <DialogDescription>
            {t.documents.uploadDescription || "Otpremite PDF, sliku, tekst ili drugi dokument"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="document-name">
              {t.documents.name} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="document-name"
              placeholder={t.documents.namePlaceholder || "Naziv dokumenta"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              data-testid="input-document-name"
            />
          </div>

          <div className="space-y-2">
            <Label>{t.documents.file || "Fajl"}</Label>
            <Card
              className={`p-6 border-2 border-dashed cursor-pointer transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              } ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.gif,.txt,.doc,.docx,.xls,.xlsx"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isSubmitting}
              />
              
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {t.documents.dragDrop || "Prevucite fajl ovde ili kliknite da izaberete"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, slike, tekst dokumenti
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t.common.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !file}
            data-testid="button-submit-document"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {t.documents.uploading || "Otpremanje..."}
              </>
            ) : (
              t.storage.uploadDocument
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
