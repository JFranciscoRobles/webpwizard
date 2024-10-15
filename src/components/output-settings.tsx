"use client";

import {
  filePrefixAtom,
  outputFormatAtom,
  qualityAtom,
  resizePercentageAtom,
} from "@/context/atom";
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

export default function OutputSettings() {
  const [outputFormat, setOutputFormat] = useAtom(outputFormatAtom);
  const [filePrefix, setFilePrefix] = useAtom(filePrefixAtom);
  const [quality, setQuality] = useAtom(qualityAtom);
  const [resizePercentage, setResizePercentage] = useAtom(resizePercentageAtom);

  return (
    <div className="p-6 space-y-6 bg-background rounded-lg shadow-md h-full">
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700">
          Quality: {quality}%
        </Label>
        <Slider
          value={[quality]}
          min={0}
          max={100}
          onValueChange={(value) => setQuality(value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700">
          Resize: {resizePercentage}%
        </Label>
        <Slider
          value={[resizePercentage]}
          min={1}
          max={100}
          onValueChange={(value) => setResizePercentage(value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700">
          Output Format
        </Label>
        <Select value={outputFormat} onValueChange={setOutputFormat}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="webp">WebP</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700">
          File Prefix
        </Label>
        <Input
          className="w-full"
          value={filePrefix}
          onChange={(value) => setFilePrefix(value.target.value)}
          placeholder="image1"
        />
      </div>
    </div>
  );
}
