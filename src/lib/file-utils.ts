/**
 * Format file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Calculate compression savings percentage
 * Returns null if the converted file is larger
 */
export function calculateSavings(original: number, converted: number): number | null {
  if (original === 0) return null;
  const savings = ((original - converted) / original) * 100;
  if (savings < 0) return null;
  return Number(savings.toFixed(1));
}

/**
 * Generate output filename based on original name and settings
 */
export function generateFileName(
  originalName: string,
  index: number,
  format: string,
  prefix: string
): string {
  const extension = format === "jpeg" ? "jpg" : format;
  return prefix
    ? `${prefix}${index + 1}.${extension}`
    : originalName.replace(/\.[^/.]+$/, "") + `.${extension}`;
}

/**
 * Validate if a file is a supported image type
 */
export const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function isValidImageFile(file: File): boolean {
  return VALID_IMAGE_TYPES.includes(file.type as (typeof VALID_IMAGE_TYPES)[number]);
}

/**
 * Get MIME type for output format
 */
export function getMimeType(format: string): string {
  if (format === "jpg" || format === "jpeg") return "image/jpeg";
  return `image/${format}`;
}
