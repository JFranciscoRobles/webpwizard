/**
 * Hook for managing image conversion process
 */

import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "@/hooks/use-toast";
import {
  queuedImagesAtom,
  convertedImagesAtom,
  isConvertingAtom,
  outputFormatAtom,
  qualityAtom,
  resizePercentageAtom,
  filePrefixAtom,
} from "@/context/atom";
import { convertImagesBatch } from "@/lib/conversion/converter";
import { generateFileName } from "@/lib/file-utils";
import { useTranslations } from "next-intl";

export function useImageConversion() {
  const t = useTranslations('toasts');
  const queuedImages = useAtomValue(queuedImagesAtom);
  const setConvertedImages = useSetAtom(convertedImagesAtom);
  const setQueuedImages = useSetAtom(queuedImagesAtom);
  const setIsConverting = useSetAtom(isConvertingAtom);

  const outputFormat = useAtomValue(outputFormatAtom);
  const quality = useAtomValue(qualityAtom);
  const resizePercentage = useAtomValue(resizePercentageAtom);
  const filePrefix = useAtomValue(filePrefixAtom);

  const handleStartConversion = useCallback(async () => {
    console.log(`[useImageConversion] Starting conversion process. Images in queue: ${queuedImages.length}`);

    if (queuedImages.length === 0) {
      console.warn(`[useImageConversion] No images in queue`);
      toast({
        title: t('noImages.title'),
        description: t('noImages.description'),
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);

    // Generate file names
    const fileNames = queuedImages.map((img, index) =>
      generateFileName(img.file.name, index, outputFormat, filePrefix)
    );
    console.log(`[useImageConversion] Generated file names:`, fileNames);

    // Initialize converted images with queued status
    setConvertedImages(
      queuedImages.map((img, index) => ({
        url: "",
        fileName: fileNames[index],
        originalName: img.file.name,
        originalSize: img.file.size,
        convertedSize: 0,
        status: "queued" as const,
        progress: 0,
      }))
    );

    try {
      console.log(`[useImageConversion] Calling convertImagesBatch with options:`, {
        format: outputFormat,
        quality,
        resizePercentage,
      });

      const results = await convertImagesBatch(
        queuedImages,
        { format: outputFormat, quality, resizePercentage },
        fileNames,
        (index, status) => {
          console.log(`[useImageConversion] Progress callback: index=${index}, status=${status}`);
          setConvertedImages((prev) =>
            prev.map((img, i) => (i === index ? { ...img, status } : img))
          );
        }
      );

      // Update with final results
      setConvertedImages(results);
      console.log(`[useImageConversion] Conversion results updated:`, results.map(r => ({ name: r.fileName, hasUrl: !!r.url, size: r.convertedSize })));

      // Check if any images failed
      const failedCount = results.filter(img => img.status === "done" && !img.url).length;
      const successCount = results.filter(img => img.status === "done" && img.url).length;
      console.log(`[useImageConversion] Success: ${successCount}, Failed: ${failedCount}`);

      if (failedCount > 0) {
        console.warn(`[useImageConversion] Some images failed: ${failedCount}`);
        toast({
          title: t('conversionWithWarnings.title'),
          description: t('conversionWithWarnings.description', { success: successCount, failed: failedCount }),
          variant: "destructive",
        });
      } else {
        console.log(`[useImageConversion] All images converted successfully`);
        const description = queuedImages.length === 1
          ? t('conversionComplete.descriptionSingle')
          : t('conversionComplete.description', { count: queuedImages.length });
        toast({
          title: t('conversionComplete.title'),
          description,
          variant: "success",
        });
      }
    } catch (error) {
      console.error(`[useImageConversion] Conversion error:`, error);
      toast({
        title: t('conversionError.title'),
        description: t('conversionError.description'),
        variant: "destructive",
      });
      console.error("Conversion error:", error);
    } finally {
      console.log(`[useImageConversion] Conversion process finished. Clearing queue.`);
      setIsConverting(false);
      setQueuedImages([]);
    }
  }, [
    queuedImages,
    outputFormat,
    quality,
    resizePercentage,
    filePrefix,
    setIsConverting,
    setConvertedImages,
    setQueuedImages,
    t,
  ]);

  return { handleStartConversion };
}
