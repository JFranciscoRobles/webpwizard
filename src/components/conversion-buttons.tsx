import { Play } from "lucide-react";
import React, { useCallback, useRef } from "react";
import { Button } from "./ui/button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "@/hooks/use-toast";
import {
  convertedImagesAtom,
  filePrefixAtom,
  isConvertingAtom,
  outputFormatAtom,
  qualityAtom,
  queuedImagesAtom,
  resizePercentageAtom,
} from "@/context/atom";

function ConversionButtons() {
  const [queuedImages, setQueuedImages] = useAtom(queuedImagesAtom);
  const [isConverting, setIsConverting] = useAtom(isConvertingAtom);
  const setConvertedImages = useSetAtom(convertedImagesAtom);
  const resizePercentage = useAtomValue(resizePercentageAtom);
  const outputFormat = useAtomValue(outputFormatAtom);
  const quality = useAtomValue(qualityAtom);
  const filePrefix = useAtomValue(filePrefixAtom);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateImageStatus = (
    index: number,
    status: "queued" | "converting" | "done",
    progress: number
  ) => {
    setConvertedImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, status, progress } : img))
    );
  };

  const generateFileName = useCallback(
    (originalName: string, index: number) => {
      const extension = outputFormat === "jpeg" ? "jpg" : outputFormat;
      return filePrefix
        ? `${filePrefix}${index + 1}.${extension}`
        : originalName.replace(/\.[^/.]+$/, "") + `.${extension}`;
    },
    [outputFormat, filePrefix]
  );

  const convertImage = useCallback(
    (file: File, index: number) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
              const scaleFactor = resizePercentage / 100;
              const newWidth = img.width * scaleFactor;
              const newHeight = img.height * scaleFactor;
              canvas.width = newWidth;
              canvas.height = newHeight;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                let mimeType = `image/${outputFormat}`;
                if (outputFormat === "jpg") mimeType = "image/jpeg";

                canvas.toBlob(
                  (blob) => {
                    if (blob) {
                      const url = URL.createObjectURL(blob);
                      setConvertedImages((prev) =>
                        prev.map((img, i) =>
                          i === index
                            ? {
                                ...img,
                                url,
                                fileName: generateFileName(
                                  img.originalName,
                                  index
                                ),
                                convertedSize: blob.size,
                                status: "done",
                                progress: 100,
                              }
                            : img
                        )
                      );
                    }
                    resolve();
                  },
                  mimeType,
                  quality / 100
                );
              } else {
                resolve();
              }
            } else {
              resolve();
            }
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    },
    [
      resizePercentage,
      outputFormat,
      quality,
      setConvertedImages,
      generateFileName,
    ]
  );

  const handleStartConversion = async () => {
    if (queuedImages.length === 0) {
      toast({
        title: "No images in queue",
        description: "Please add some images before starting the conversion.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setConvertedImages(
      queuedImages.map((img, index) => ({
        url: "",
        fileName: generateFileName(img.file.name, index),
        originalName: img.file.name,
        originalSize: img.file.size,
        convertedSize: 0,
        status: "queued",
        progress: 0,
      }))
    );

    try {
      await Promise.all(
        queuedImages.map((image, index) => {
          updateImageStatus(index, "converting", 0);
          return convertImage(image.file, index);
        })
      );

      toast({
        title: "Conversion complete",
        description: "All images have been successfully converted.",
      });
    } catch (error) {
      toast({
        title: "Error during conversion",
        description: "Some images could not be converted.",
        variant: "destructive",
      });
      console.error("Conversion error:", error);
    } finally {
      setIsConverting(false);
      setQueuedImages([]);
    }
  };

  return (
    <>
      <Button
        onClick={handleStartConversion}
        className="mt-4 w-full"
        disabled={isConverting}
      >
        <Play className="w-4 h-4 mr-2" />
        {isConverting ? "Converting..." : "Start Conversion"}
      </Button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}

export default ConversionButtons;
