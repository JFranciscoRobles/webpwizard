/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import type { QueuedImage } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePreviewDialog } from "@/components/images/image-preview-dialog";
import { formatFileSize } from "@/lib/file-utils";

interface QueuedImageItemProps {
  image: QueuedImage;
  index: number;
  onRemove: (index: number) => void;
}

export function QueuedImageItem({ image, index, onRemove }: QueuedImageItemProps) {
  return (
    <div
      className="group relative fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <ImagePreviewDialog
        src={image.preview}
        alt={image.file.name}
        fileName={image.file.name}
        fileSize={image.file.size}
      >
        <div className="relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-muted/80 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          <img
            src={image.preview}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
            alt={image.file.name}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* File info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-xs font-medium truncate">{image.file.name}</p>
            <p className="text-white/70 text-xs">{formatFileSize(image.file.size)}</p>
          </div>
        </div>
      </ImagePreviewDialog>

      {/* Remove button */}
      <Button
        onClick={() => onRemove(index)}
        size="icon"
        variant="destructive"
        className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* Image count badge */}
      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold flex items-center justify-center">
        {index + 1}
      </div>
    </div>
  );
}
