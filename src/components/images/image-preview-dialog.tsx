/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatFileSize } from "@/lib/file-utils";

interface ImagePreviewDialogProps {
  src: string;
  alt: string;
  fileName?: string;
  fileSize?: number;
  convertedSize?: number;
  children: ReactNode;
}

export function ImagePreviewDialog({
  src,
  alt,
  fileName,
  fileSize,
  convertedSize,
  children,
}: ImagePreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl p-6 bg-card rounded-2xl shadow-xl border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Image Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex justify-center items-center bg-muted/30 rounded-xl p-4">
          <img
            src={src}
            className="max-w-full h-auto rounded-lg shadow-md max-h-[60vh] object-contain"
            alt={alt}
          />
        </div>
        {(fileName || fileSize) && (
          <DialogFooter className="mt-4 flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-xl bg-muted/30">
            {fileName && (
              <div className="text-sm">
                <p className="font-medium">{fileName}</p>
                {fileSize && <p className="text-muted-foreground">{formatFileSize(fileSize)}</p>}
              </div>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
