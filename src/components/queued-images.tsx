"use client";

import { useAtom } from "jotai";
import { Image as ImageIcon } from "lucide-react";
import { queuedImagesAtom } from "@/context/atom";
import { QueuedImageItem } from "@/components/images/queued-image-item";
import ConversionButtons from "./conversion-buttons";
import { useTranslations } from "next-intl";

export default function QueuedImages() {
  const t = useTranslations('queue');
  const [queuedImages, setQueuedImages] = useAtom(queuedImagesAtom);

  const handleRemoveImage = (index: number) => {
    setQueuedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full h-full max-h-150 p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{t('title')}</h2>
            <p className="text-sm text-muted-foreground">
              {queuedImages.length} {queuedImages.length === 1 ? 'image' : 'images'} {t('images').split(' ').slice(1).join(' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6 flex-1 overflow-auto p-1">
        {queuedImages.map((image, index) => (
          <QueuedImageItem
            key={index}
            image={image}
            index={index}
            onRemove={handleRemoveImage}
          />
        ))}
      </div>

      {/* Action Button */}
      <ConversionButtons />
    </div>
  );
}
