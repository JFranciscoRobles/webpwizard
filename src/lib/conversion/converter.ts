/**
 * Image conversion service
 * Handles single image conversion using Canvas API
 */

import type { ConvertedImage, QueuedImage, OutputFormat } from "@/types";
import { getMimeType } from "@/lib/file-utils";

export interface ConversionOptions {
  format: OutputFormat;
  quality: number;
  resizePercentage: number;
}

export interface ConversionResult {
  url: string;
  fileName: string;
  convertedSize: number;
}

/**
 * Convert a single image using Canvas API
 */
export async function convertImage(
  file: File,
  options: ConversionOptions,
  fileName: string
): Promise<ConversionResult> {
  console.log(`[Converter] Starting conversion: ${fileName}, format: ${options.format}, quality: ${options.quality}, resize: ${options.resizePercentage}%`);

  return new Promise<ConversionResult>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      console.error(`[Converter] FileReader error for: ${fileName}`);
      reject(new Error("Failed to read file"));
    };
    reader.onload = (event) => {
      console.log(`[Converter] File read complete: ${fileName}, size: ${file.size} bytes`);
      const img = new Image();
      img.onerror = () => {
        console.error(`[Converter] Image load error for: ${fileName}`);
        reject(new Error("Failed to load image"));
      };
      img.onload = () => {
        console.log(`[Converter] Image loaded: ${fileName}, dimensions: ${img.width}x${img.height}`);
        const canvas = document.createElement("canvas");
        const scaleFactor = options.resizePercentage / 100;
        const newWidth = Math.max(1, img.width * scaleFactor);
        const newHeight = Math.max(1, img.height * scaleFactor);
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error(`[Converter] Canvas context error for: ${fileName}`);
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const mimeType = getMimeType(options.format);
        console.log(`[Converter] Converting to blob: ${fileName}, mimeType: ${mimeType}`);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(`[Converter] Conversion complete: ${fileName}, size: ${blob.size} bytes`);
              resolve({
                url: URL.createObjectURL(blob),
                fileName,
                convertedSize: blob.size,
              });
            } else {
              console.error(`[Converter] Blob creation failed for: ${fileName}`);
              reject(new Error("Failed to create blob"));
            }
          },
          mimeType,
          options.quality / 100
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Convert multiple images with concurrency control
 */
export async function convertImagesBatch(
  images: QueuedImage[],
  options: ConversionOptions,
  fileNames: string[],
  onProgress?: (index: number, status: ConvertedImage["status"]) => void
): Promise<ConvertedImage[]> {
  console.log(`[Converter] Batch conversion started: ${images.length} images`);
  console.log(`[Converter] Options:`, options);

  const MAX_CONCURRENT = navigator.hardwareConcurrency || 4;
  const results: ConvertedImage[] = images.map((img, index) => ({
    url: "",
    fileName: fileNames[index],
    originalName: img.file.name,
    originalSize: img.file.size,
    convertedSize: 0,
    status: "queued" as const,
    progress: 0,
  }));

  const errors: Array<{ index: number; error: Error }> = [];

  const concurrency = Math.min(MAX_CONCURRENT, images.length);
  console.log(`[Converter] Concurrency: ${concurrency}`);

  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency);
    const batchIndices = batch.map((_, idx) => i + idx);
    console.log(`[Converter] Processing batch ${Math.floor(i / concurrency) + 1}, images ${i}-${Math.min(i + concurrency, images.length)}`);

    // Update status to converting for this batch
    batchIndices.forEach((index) => {
      results[index] = { ...results[index], status: "converting" };
      onProgress?.(index, "converting");
    });

    // Process batch in parallel
    const conversions = batch.map((img, batchIdx) =>
      convertImage(img.file, options, results[i + batchIdx].fileName)
    );

    const conversionResults = await Promise.allSettled(conversions);
    console.log(`[Converter] Batch ${Math.floor(i / concurrency) + 1} completed, fulfilled: ${conversionResults.filter(r => r.status === 'fulfilled').length}, rejected: ${conversionResults.filter(r => r.status === 'rejected').length}`);

    conversionResults.forEach((result, batchIdx) => {
      const index = i + batchIdx;
      if (result.status === "fulfilled") {
        results[index] = {
          ...results[index],
          url: result.value.url,
          convertedSize: result.value.convertedSize,
          status: "done",
          progress: 100,
        };
        onProgress?.(index, "done");
      } else {
        // On error, mark as done but with empty URL
        results[index] = { ...results[index], status: "done", progress: 100 };
        const error = result.reason instanceof Error ? result.reason : new Error(String(result.reason));
        errors.push({ index, error });
        console.error(`Failed to convert image at index ${index}:`, error);
      }
    });
  }

  console.log(`[Converter] Batch conversion complete. Success: ${results.filter(r => r.url).length}, Failed: ${errors.length}`);

  // Only throw if ALL images failed
  if (errors.length === images.length && images.length > 0) {
    console.error(`[Converter] All images failed!`);
    throw new Error(`All ${images.length} image(s) failed to convert`);
  }

  return results;
}
