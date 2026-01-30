import { Play, Wand2 } from "lucide-react";
import { useAtomValue } from "jotai";
import { Button } from "./ui/button";
import { isConvertingAtom, queuedImagesAtom } from "@/context/atom";
import { useImageConversion } from "@/hooks/conversion/use-image-conversion";
import { useTranslations } from "next-intl";

function ConversionButtons() {
  const t = useTranslations();
  const isConverting = useAtomValue(isConvertingAtom);
  const queuedImages = useAtomValue(queuedImagesAtom);
  const { handleStartConversion } = useImageConversion();

  return (
    <Button
      onClick={handleStartConversion}
      className="w-full shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-all duration-300"
      disabled={isConverting || queuedImages.length === 0}
      size="lg"
    >
      {isConverting ? (
        <>
          <Wand2 className="w-5 h-5 mr-2 animate-pulse" />
          {t('converting')}
        </>
      ) : (
        <>
          <Play className="w-5 h-5 mr-2" />
          {t('startConversion')}
        </>
      )}
    </Button>
  );
}

export default ConversionButtons;
