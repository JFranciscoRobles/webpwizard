/* eslint-disable @next/next/no-img-element */
"use client";
import { useAtomValue } from "jotai";
import { Button } from "./ui/button";
import { Download, Loader2, Clock } from "lucide-react";
import { convertedImagesAtom } from "@/context/atom";
import { toast } from "@/hooks/use-toast";
import JSZip from "jszip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import ResetButton from "./reset-button";

export const ConvertedImagesList = () => {
  const convertedImages = useAtomValue(convertedImagesAtom);

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download started",
      description: `${fileName} is being downloaded.`,
    });
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const promises = convertedImages
      .filter((image) => image.status === "done")
      .map(async (image) => {
        const response = await fetch(image.url);
        const blob = await response.blob();
        zip.file(image.fileName, blob);
      });

    await Promise.all(promises);
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted_images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "Download started",
      description: "All converted images are being downloaded as a ZIP.",
    });
  };

  return (
    <div className="flex flex-col w-full p-6 bg-background rounded-xl">
      <h2 className="text-xl font-medium p-2 bg-primary text-primary-foreground w-fit rounded-xl mb-4">
        Converted Images
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px] place-content-start overflow-auto p-6 bg-background rounded-xl">
        {convertedImages.map((image, index) => (
          <div key={index} className="relative group">
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
                  {image.status === "queued" ? (
                    <div className="flex justify-center items-center h-full">
                      <Clock className="w-10 h-10 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">Queued</span>
                    </div>
                  ) : image.status === "converting" ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <img
                      src={image.url}
                      alt={`Converted ${index}`}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  )}
                </div>
              </DialogTrigger>

              {image.status === "done" && (
                <DialogContent className="max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                      Image Preview
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 flex justify-center items-center">
                    <img
                      src={image.url}
                      alt={`Converted ${index}`}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <DialogFooter className="mt-4 text-sm text-primary-foreground bg-primary p-4 rounded-xl">
                    {image.fileName}
                  </DialogFooter>
                </DialogContent>
              )}
            </Dialog>

            {image.status === "done" && (
              <Button
                size="icon"
                onClick={() => handleDownload(image.url, image.fileName)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <ResetButton />
        {convertedImages.some((img) => img.status === "done") && (
          <Button onClick={handleDownloadAll} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download All as ZIP
          </Button>
        )}
      </div>
    </div>
  );
};
