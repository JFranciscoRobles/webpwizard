"use client";

import { ConvertedImagesList } from "@/components/converted-images-list";
import FileUpload from "@/components/file-upload";
import OutputSettings from "@/components/output-settings";
import QueuedImages from "@/components/queued-images";
import MobileStepper from "@/components/mobile-stepper";
import {
  convertedImagesAtom,
  isConvertingAtom,
  queuedImagesAtom,
} from "@/context/atom";
import { useAtomValue } from "jotai";
import { Zap, Shield, Download } from "lucide-react";
import { FeatureCard } from "@/components/layout/feature-card";
import { StepCard } from "@/components/layout/step-card";
import { PageHeader } from "@/components/layout/page-header";
import { PageFooter } from "@/components/layout/page-footer";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const queuedImages = useAtomValue(queuedImagesAtom);
  const convertedImages = useAtomValue(convertedImagesAtom);
  const isConverting = useAtomValue(isConvertingAtom);

  const hasContent = queuedImages.length > 0 || convertedImages.length > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      {/* Header */}
      <PageHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {!hasContent ? (
          // Landing View - Show features when no images
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Upload Section */}
            <div className="slide-in-up" style={{ animationDelay: "0.1s" }}>
              <FileUpload />
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title={t('features.title')}
                description={t('features.description')}
                delay="0.2s"
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title={t('features.privacy.title')}
                description={t('features.privacy.description')}
                delay="0.3s"
              />
              <FeatureCard
                icon={<Download className="w-6 h-6" />}
                title={t('features.batch.title')}
                description={t('features.batch.description')}
                delay="0.4s"
              />
            </div>

            {/* How it works */}
            <div className="mt-20 text-center space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                {t('howItWorks.title')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <StepCard number={1} title={t('howItWorks.steps.upload.title')} description={t('howItWorks.steps.upload.description')} />
                <StepCard number={2} title={t('howItWorks.steps.configure.title')} description={t('howItWorks.steps.configure.description')} />
                <StepCard number={3} title={t('howItWorks.steps.download.title')} description={t('howItWorks.steps.download.description')} />
              </div>
            </div>
          </div>
        ) : (
          // Active Conversion View
          <>
            {/* Mobile - Stepper when converting or queued, ConvertedImagesList when done */}
            <div className="md:hidden">
              {convertedImages.length > 0 ? <ConvertedImagesList /> : <MobileStepper />}
            </div>

            {/* Desktop - Two Columns */}
            <div className="hidden md:grid grid-cols-[25%_75%] gap-6 items-stretch">
              {/* Left Column - Settings */}
              <div className="h-full">
                <OutputSettings />
              </div>

              {/* Right Column - Images */}
              <div className="h-full">
                {!isConverting && queuedImages.length > 0 && <QueuedImages />}

                {convertedImages.length > 0 && <ConvertedImagesList />}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <PageFooter />
    </div>
  );
}
