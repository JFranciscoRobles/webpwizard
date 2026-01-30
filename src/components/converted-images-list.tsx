"use client";

import { useAtomValue } from "jotai";
import { Button } from "./ui/button";
import { CheckCircle2, Archive } from "lucide-react";
import { convertedImagesAtom, filePrefixAtom } from "@/context/atom";
import { toast } from "@/hooks/use-toast";
import JSZip from "jszip";
import { ConvertedImageItem } from "@/components/images/converted-image-item";
import { cn } from "@/lib/utils";
import ResetButton from "./reset-button";
import { useTranslations } from "next-intl";

export const ConvertedImagesList = () => {
  const t = useTranslations('converted');
  const tToast = useTranslations('toasts');
  const convertedImages = useAtomValue(convertedImagesAtom);
  const filePrefix = useAtomValue(filePrefixAtom);

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: tToast('downloadStarted.title'),
      description: tToast('downloadStarted.description', { fileName }),
      variant: "success",
    });
  };

  const handleDownloadAll = async () => {
    console.log(`[ConvertedImagesList] Starting download all. Images: ${convertedImages.length}`);
    const zip = new JSZip();
    const promises = convertedImages
      .filter((image) => image.status === "done" && image.url)
      .map(async (image, idx) => {
        try {
          console.log(`[ConvertedImagesList] Fetching image ${idx + 1}: ${image.fileName}, url: ${image.url}`);
          const response = await fetch(image.url);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const blob = await response.blob();
          console.log(`[ConvertedImagesList] Image ${idx + 1} fetched, size: ${blob.size} bytes`);
          zip.file(image.fileName, blob);
        } catch (error) {
          console.error(`[ConvertedImagesList] Failed to fetch image ${image.fileName}:`, error);
        }
      });

    console.log(`[ConvertedImagesList] Waiting for all fetches to complete...`);
    await Promise.all(promises);
    console.log(`[ConvertedImagesList] All fetches complete, generating ZIP...`);

    const content = await zip.generateAsync({ type: "blob" });
    console.log(`[ConvertedImagesList] ZIP generated, size: ${content.size} bytes`);

    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = filePrefix ? `${filePrefix}images.zip` : "converted_images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`[ConvertedImagesList] Download triggered`);
    toast({
      title: tToast('downloadAllStarted.title'),
      description: tToast('downloadAllStarted.description'),
      variant: "success",
    });
  };

  const doneCount = convertedImages.filter((img) => img.status === "done").length;
  const totalCount = convertedImages.length;

  return (
    <div className="flex flex-col w-full h-full max-h-150 p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{t('title')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('complete', { count: totalCount })}
            </p>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6 flex-1 overflow-auto p-1">
        {convertedImages.map((image, index) => (
          <ConvertedImageItem
            key={index}
            image={image}
            index={index}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <ResetButton className="flex-1" />
        {doneCount > 0 && (
          <Button
            onClick={handleDownloadAll}
            className="flex-1 shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-shadow min-h-11 sm:min-h-0"
            size="default"
          >
            <Archive className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
            <span className="text-sm sm:text-base">
              {t('downloadAllShort')}
              <span className="hidden sm:inline"> ({t('asZip', { count: doneCount })})</span>
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
