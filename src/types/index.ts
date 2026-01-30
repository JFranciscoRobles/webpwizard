// Image types
export interface QueuedImage {
  file: File;
  preview: string;
}

export type ConversionStatus = "queued" | "converting" | "done";

export interface ConvertedImage {
  url: string;
  fileName: string;
  originalName: string;
  originalSize: number;
  convertedSize: number;
  status: ConversionStatus;
  progress: number;
}

// Format types
export type OutputFormat = "webp" | "jpeg" | "png";

export interface FormatOption {
  value: OutputFormat;
  label: string;
  description: string;
}

// Step types for mobile stepper
export type Step = "queue" | "settings";

export interface StepConfig {
  key: Step;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}
