"use client";

import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  outputFormatAtom,
  qualityAtom,
  resizePercentageAtom,
  filePrefixAtom,
  queuedImagesAtom,
  isConvertingAtom,
} from "@/context/atom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  FileOutput,
  Image as ImageIcon,
  Maximize,
  FileText,
  ChevronRight,
  ChevronLeft,
  Check,
  Layers,
  Play,
  Wand2,
  Settings,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingSection } from "@/components/settings/setting-section";
import { FORMAT_OPTIONS, getQualityLabel, getResizeLabel, getQualityColorClasses } from "@/lib/format-utils";
import { useImageConversion } from "@/hooks/conversion/use-image-conversion";
import type { Step, OutputFormat } from "@/types";
import { useTranslations } from "next-intl";

export default function MobileStepper() {
  const t = useTranslations('stepper');
  const tSettings = useTranslations('settings');
  const tQueue = useTranslations('queue');
  const [currentStep, setCurrentStep] = useState<Step>("queue");
  const [queuedImages, setQueuedImages] = useAtom(queuedImagesAtom);
  const isConverting = useAtomValue(isConvertingAtom);

  const [outputFormat, setOutputFormat] = useAtom(outputFormatAtom);
  const [filePrefix, setFilePrefix] = useAtom(filePrefixAtom);
  const [quality, setQuality] = useAtom(qualityAtom);
  const [resizePercentage, setResizePercentage] = useAtom(resizePercentageAtom);

  const { handleStartConversion } = useImageConversion();

  const steps: { key: Step; icon: typeof Layers; title: string }[] = [
    { key: "queue", icon: Layers, title: t('queue') },
    { key: "settings", icon: Settings, title: t('settings') },
  ];

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].key);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].key);
    }
  };

  const handleRemoveImage = (index: number) => {
    setQueuedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="md:hidden flex flex-col w-full">
      {/* Step Indicators - Fixed at top */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-1">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < stepIndex;
            const isCurrent = index === stepIndex;
            return (
              <div key={step.key} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.key)}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary/20 text-primary ring-2 ring-primary",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-5 h-0.5 mx-0.5 transition-colors duration-200",
                      index < stepIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 p-4 min-h-[calc(100vh-140px)] overflow-y-auto">
        {currentStep === "queue" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              {t('queue')} ({queuedImages.length})
            </h3>
            {queuedImages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {tQueue('noImages')}
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {queuedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border/50">
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-0.5 left-0.5 w-4 h-4 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentStep === "settings" && (
          <div className="space-y-5">
            {/* Output Format */}
            <SettingSection icon={FileOutput} title={tSettings('outputFormat')}>
              <Select value={outputFormat} onValueChange={(value) => setOutputFormat(value as OutputFormat)}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {FORMAT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {tSettings(`formats.${option.value}` as const)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingSection>

            {/* Quality */}
            <SettingSection icon={ImageIcon} title={tSettings('quality.title')}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {outputFormat === "png" ? tSettings('quality.notAvailable') : tSettings('quality.level')}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      outputFormat === "png"
                        ? "bg-muted text-muted-foreground"
                        : getQualityColorClasses(quality)
                    }`}
                  >
                    {outputFormat === "png" ? "N/A" : `${quality}%`}
                  </span>
                </div>
                <Slider
                  value={[quality]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => setQuality(value[0])}
                  disabled={outputFormat === "png"}
                  className={outputFormat === "png" ? "opacity-50" : ""}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{tSettings('quality.smaller')}</span>
                  <span>{getQualityLabel(quality)}</span>
                  <span>{tSettings('quality.better')}</span>
                </div>
              </div>
            </SettingSection>

            {/* Resize */}
            <SettingSection icon={Maximize} title={tSettings('resize.title')}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{tSettings('resize.imageSize')}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {getResizeLabel(resizePercentage)}
                  </span>
                </div>
                <Slider
                  value={[resizePercentage]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setResizePercentage(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </SettingSection>

            {/* File Prefix */}
            <SettingSection icon={FileText} title={tSettings('fileNaming.title')}>
              <Input
                className="w-full bg-background"
                value={filePrefix}
                onChange={(value) => setFilePrefix(value.target.value)}
                placeholder={tSettings('fileNaming.placeholder')}
              />
            </SettingSection>

            {/* Summary */}
            <div className="p-3 rounded-xl bg-muted/30 border border-border/40">
              <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                <Check className="w-4 h-4 text-green-600" />
                {tSettings('ready.title')}
              </h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{tSettings('ready.images')}</span>
                <span className="font-medium">{queuedImages.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons - Fixed at bottom */}
      <div className="sticky bottom-0 bg-background border-t border-border/50 p-4 gap-3 flex items-center">
        {isConverting ? (
          <Button className="w-full" disabled>
            <Wand2 className="w-4 h-4 mr-2 animate-spin" />
            {t('converting')}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={stepIndex === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('back')}
            </Button>
            {currentStep === "settings" ? (
              <Button
                onClick={handleStartConversion}
                disabled={queuedImages.length === 0}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-1" />
                {t('convert')}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex-1"
              >
                {t('next')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
