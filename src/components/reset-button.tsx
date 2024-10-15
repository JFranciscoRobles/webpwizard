"use client";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "./ui/button";
import { useSetAtom } from "jotai";
import {
  convertedImagesAtom,
  filePrefixAtom,
  isConvertingAtom,
  outputFormatAtom,
  qualityAtom,
  queuedImagesAtom,
  resizePercentageAtom,
} from "@/context/atom";

function ResetButton() {
  const setQueuedImages = useSetAtom(queuedImagesAtom);
  const setConvertedImages = useSetAtom(convertedImagesAtom);
  const setQuality = useSetAtom(qualityAtom);
  const setResizePercentage = useSetAtom(resizePercentageAtom);
  const setFilePrefix = useSetAtom(filePrefixAtom);
  const setOutputFormat = useSetAtom(outputFormatAtom);
  const setIsConverting = useSetAtom(isConvertingAtom);

  const { toast } = useToast();

  const handleReset = () => {
    setQueuedImages([]);
    setConvertedImages([]);
    setQuality(80);
    setResizePercentage(100);
    setFilePrefix("");
    setOutputFormat("webp");
    setIsConverting(false);

    toast({
      title: "Reset Complete",
      description: "All images and settings have been reset.",
    });
  };

  return (
    <Button variant="destructive" onClick={handleReset}>
      Reset all
    </Button>
  );
}

export default ResetButton;
