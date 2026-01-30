/**
 * Format options for the converter
 */
import { type FormatOption } from "@/types";

export const FORMAT_OPTIONS: FormatOption[] = [
  { value: "webp", label: "WebP", description: "Best compression, modern format" },
  { value: "jpeg", label: "JPEG", description: "Maximum compatibility" },
  { value: "png", label: "PNG", description: "Lossless compression" },
];

/**
 * Get quality label based on value
 */
export function getQualityLabel(value: number): string {
  if (value < 25) return "Low";
  if (value < 50) return "Medium";
  if (value < 75) return "Good";
  return "Best";
}

/**
 * Get resize label based on percentage
 */
export function getResizeLabel(value: number): string {
  if (value === 100) return "Original";
  if (value < 50) return `${value}% (Small)`;
  if (value < 80) return `${value}% (Medium)`;
  return `${value}% (Large)`;
}

/**
 * Get quality color classes based on value
 */
export function getQualityColorClasses(value: number): string {
  if (value >= 75) {
    return "bg-green-500/10 text-green-600 dark:text-green-400";
  }
  if (value >= 50) {
    return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
  }
  return "bg-red-500/10 text-red-600 dark:text-red-400";
}
