/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />

export interface ConversionMessage {
  id: number;
  imageData: string;
  width: number;
  height: number;
  outputFormat: string;
  quality: number;
}

export interface ConversionResult {
  id: number;
  blob: Blob;
  error?: string;
}

self.onmessage = (event: MessageEvent<ConversionMessage>) => {
  const { id, imageData, width, height, outputFormat, quality } = event.data;

  const img = new Image();
  img.onload = () => {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      self.postMessage({ id, error: "Failed to get canvas context" } as ConversionResult);
      return;
    }

    ctx.drawImage(img, 0, 0, width, height);

    let mimeType = `image/${outputFormat}`;
    if (outputFormat === "jpg" || outputFormat === "jpeg") mimeType = "image/jpeg";

    canvas.convertToBlob({ type: mimeType, quality: quality / 100 })
      .then((blob) => {
        self.postMessage({ id, blob } as ConversionResult);
      })
      .catch((error) => {
        self.postMessage({ id, error: error.message } as ConversionResult);
      });
  };

  img.onerror = () => {
    self.postMessage({ id, error: "Failed to load image" } as ConversionResult);
  };

  img.src = imageData;
};

export {};
