"use client";

import { useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { queuedImagesAtom } from "@/context/atom";
import { Input } from "./ui/input";
import { UploadIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setQueuedImages = useSetAtom(queuedImagesAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

  const handleFileChange = (files: FileList) => {
    const newImages = Array.from(files)
      .filter((file) => {
        if (!validImageTypes.includes(file.type)) {
          setError("Only JPEG, PNG, and WebP images are allowed.");
          return false;
        }
        return true;
      })
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    if (newImages.length > 0) {
      setQueuedImages((prev) => [...prev, ...newImages]);
      setError(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition duration-200 ease-in-out h-full bg-background flex justify-center items-center flex-col ${
        isDragging ? "bg-blue-50 border-primary" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-center mb-4">
        <UploadIcon className="h-12 w-12 text-gray-400" />
      </div>

      <p className="text-lg font-medium text-gray-700">
        {isDragging
          ? "Drop the images here..."
          : "Drag and drop images here or select from your device"}
      </p>

      <p className="text-sm text-gray-500 mt-2 mb-6">
        Supported formats: JPEG, PNG, WebP
      </p>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <Input
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFileChange(e.target.files)}
        ref={fileInputRef}
      />

      <Button onClick={() => fileInputRef.current?.click()}>
        Select Images
      </Button>
    </div>
  );
}
