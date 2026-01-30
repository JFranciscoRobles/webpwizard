/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import type { ConvertedImage } from "@/types";
import { Clock, Loader2, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePreviewDialog } from "@/components/images/image-preview-dialog";
import { formatFileSize, calculateSavings } from "@/lib/file-utils";
import { useTranslations } from "next-intl";

interface ConvertedImageItemProps {
  image: ConvertedImage;
  index: number;
  onDownload: (url: string, fileName: string) => void;
}

export function ConvertedImageItem({ image, index, onDownload }: ConvertedImageItemProps) {
  const t = useTranslations('status');
  const savings = image.originalSize > 0 ? calculateSavings(image.originalSize, image.convertedSize) : null;
  const hasUrl = image.status === "done" && image.url;

  return (
    <div
      className={cn(
        "group relative fade-in",
        image.status === "done" ? "scale-in" : ""
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {hasUrl ? (
        <ImagePreviewDialog
          src={image.url}
          alt={`Converted ${index}`}
          fileName={image.fileName}
          fileSize={image.convertedSize}
        >
          <div className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 bg-muted/80 border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
            <img
              src={image.url}
              alt={`Converted ${index}`}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
            />
          </div>
        </ImagePreviewDialog>
      ) : (
        <div className={cn(
          "relative aspect-square rounded-xl overflow-hidden border transition-all duration-300",
          image.status === "done"
            ? "bg-muted/80 border-border/50"
            : "bg-muted/50 border-border/30"
        )}>
          {image.status === "queued" ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Clock className="w-8 h-8 text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">{t('queued')}</span>
            </div>
          ) : image.status === "converting" ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">{t('converting')}</span>
            </div>
          ) : image.status === "done" && !image.url ? (
            // "Done" but no URL yet - show loading instead of error
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">{t('finalizing')}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <Clock className="w-8 h-8 text-destructive/50" />
              <span className="text-xs text-destructive">{t('error')}</span>
            </div>
          )}
        </div>
      )}

      {/* Download button for completed images */}
      {hasUrl && (
        <>
          <Button
            size="icon"
            onClick={() => onDownload(image.url, image.fileName)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg bg-primary hover:bg-primary/90 hover:scale-110"
          >
            <Download className="w-4 h-4" />
          </Button>

          {/* Status badge */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {t('done')}
          </div>

          {/* Savings indicator */}
          {savings !== null && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-xs font-medium">
              -{savings}%
            </div>
          )}
        </>
      )}
    </div>
  );
}
