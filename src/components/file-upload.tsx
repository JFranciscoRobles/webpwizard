"use client";

import { useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { queuedImagesAtom } from "@/context/atom";
import { Input } from "./ui/input";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { VALID_IMAGE_TYPES } from "@/lib/file-utils";
import { useTranslations } from "next-intl";

export default function FileUpload() {
  const t = useTranslations('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setQueuedImages = useSetAtom(queuedImagesAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (files: FileList) => {
    const newImages = Array.from(files)
      .filter((file) => {
        if (!VALID_IMAGE_TYPES.includes(file.type as (typeof VALID_IMAGE_TYPES)[number])) {
          setError(t('error'));
          return false;
        }
        return true;
      })
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    if (newImages.length > 0) {
      setQueuedImages((prev) => [...prev, ...newImages]);
      setError(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={cn(
          "relative group overflow-hidden rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300 cursor-pointer",
          "bg-card/50 backdrop-blur-sm",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border/50 hover:border-primary/50 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-size-[24px_24px]" />
        </div>

        {/* Gradient glow effect on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-accent/5 transition-all duration-500" />

        <div className="relative flex flex-col items-center gap-6">
          {/* Icon with animation */}
          <div className="relative">
            <div className={cn(
              "absolute inset-0 bg-primary/20 blur-2xl rounded-full transition-all duration-500",
              isDragging ? "scale-150 opacity-100" : "scale-100 opacity-50 group-hover:scale-125"
            )} />
            <div className={cn(
              "relative flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300",
              "bg-linear-to-br from-primary/10 to-accent/10",
              "group-hover:from-primary group-hover:to-accent",
              "group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/25"
            )}>
              <Upload className={cn(
                "w-10 h-10 transition-colors duration-300",
                isDragging ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"
              )} />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-2">
            <p className="text-xl font-semibold text-foreground">
              {isDragging ? t('title') : t('title')}
            </p>
            <p className="text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* Supported formats badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["JPEG", "PNG", "WebP"].map((format) => (
              <span
                key={format}
                className="px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground border border-border/50"
              >
                {format}
              </span>
            ))}
          </div>

          {/* Upload button */}
          <Button
            size="lg"
            className="shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            {t('selectImages')}
          </Button>
        </div>

        {/* Error message */}
        {error && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <Input
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFileChange(e.target.files)}
        ref={fileInputRef}
      />
    </div>
  );
}
