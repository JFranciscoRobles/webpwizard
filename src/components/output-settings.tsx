"use client";

import {
  filePrefixAtom,
  outputFormatAtom,
  qualityAtom,
  resizePercentageAtom,
} from "@/context/atom";
import type { OutputFormat } from "@/types";
import { useAtom } from "jotai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import {
  Settings,
  Image as ImageIcon,
  Maximize,
  FileOutput,
} from "lucide-react";
import { SettingSection } from "@/components/settings/setting-section";
import { FORMAT_OPTIONS, getQualityLabel, getResizeLabel, getQualityColorClasses } from "@/lib/format-utils";
import { useTranslations } from "next-intl";

export default function OutputSettings() {
  const t = useTranslations('settings');
  const [outputFormat, setOutputFormat] = useAtom(outputFormatAtom);
  const [filePrefix, setFilePrefix] = useAtom(filePrefixAtom);
  const [quality, setQuality] = useAtom(qualityAtom);
  const [resizePercentage, setResizePercentage] = useAtom(resizePercentageAtom);

  return (
    <div className="h-full flex flex-col space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-linear-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
        <div className="p-1.5 rounded-lg bg-white/20">
          <Settings className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-semibold text-sm">{t('title')}</h2>
        </div>
      </div>

      {/* Output Format */}
      <SettingSection icon={FileOutput} title={t('outputFormat')}>
        <Select value={outputFormat} onValueChange={(value) => setOutputFormat(value as OutputFormat)}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {FORMAT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{t(`formats.${option.value}` as const)}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t(`formatDescriptions.${option.value}` as const)}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingSection>

      {/* Quality Slider */}
      <SettingSection icon={ImageIcon} title={t('quality.title')}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">
              {outputFormat === "png" ? t('quality.notAvailable') : t('quality.level')}
            </Label>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${outputFormat === "png"
                  ? "bg-muted text-muted-foreground"
                  : getQualityColorClasses(quality)
                }`}
            >
              {quality}%
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
            <span>{t('quality.smaller')}</span>
            <span>{getQualityLabel(quality)}</span>
            <span>{t('quality.better')}</span>
          </div>
        </div>
      </SettingSection>

      {/* Resize Slider */}
      <SettingSection icon={Maximize} title={t('resize.title')}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">{t('resize.imageSize')}</Label>
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
      <SettingSection icon={FileOutput} title={t('fileNaming.title')}>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            {t('fileNaming.label')}
          </Label>
          <Input
            className="w-full bg-background"
            value={filePrefix}
            onChange={(value) => setFilePrefix(value.target.value)}
            placeholder={t('fileNaming.placeholder')}
          />
          {filePrefix && (
            <p className="text-xs text-muted-foreground">
              {t('fileNaming.preview')} <code className="px-1.5 py-0.5 rounded bg-muted">{filePrefix}1.{outputFormat === "jpeg" ? "jpg" : outputFormat}</code>
            </p>
          )}
        </div>
      </SettingSection>
    </div>
  );
}
