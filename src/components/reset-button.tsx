"use client";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import { RotateCcw } from "lucide-react";
import {
  convertedImagesAtom,
  filePrefixAtom,
  isConvertingAtom,
  outputFormatAtom,
  qualityAtom,
  queuedImagesAtom,
  resizePercentageAtom,
} from "@/context/atom";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function ResetButton({ className }: { className?: string }) {
  const t = useTranslations('converted');
  const tToast = useTranslations('toasts');
  const setQueuedImages = useSetAtom(queuedImagesAtom);
  const setConvertedImages = useSetAtom(convertedImagesAtom);
  const setQuality = useSetAtom(qualityAtom);
  const setResizePercentage = useSetAtom(resizePercentageAtom);
  const setFilePrefix = useSetAtom(filePrefixAtom);
  const setOutputFormat = useSetAtom(outputFormatAtom);
  const setIsConverting = useSetAtom(isConvertingAtom);

  const handleReset = () => {
    setQueuedImages([]);
    setConvertedImages([]);
    setQuality(80);
    setResizePercentage(100);
    setFilePrefix("");
    setOutputFormat("webp");
    setIsConverting(false);

    toast({
      title: tToast('resetComplete.title'),
      description: tToast('resetComplete.description'),
      variant: "success",
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleReset}
      className={cn("border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200", className)}
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      {t('reset')}
    </Button>
  );
}

export default ResetButton;
