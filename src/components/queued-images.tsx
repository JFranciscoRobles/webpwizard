/* eslint-disable @next/next/no-img-element */
"use client";
import { queuedImagesAtom } from "@/context/atom";
import { useAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import ConversionButtons from "./conversion-buttons";

export default function QueuedImages() {
  const [queuedImages, setQueuedImages] = useAtom(queuedImagesAtom);

  const handleRemoveImage = (index: number) => {
    setQueuedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full p-6 bg-background rounded-xl">
      <h2 className="text-xl font-medium p-2 bg-primary text-primary-foreground w-fit rounded-xl mb-4">
        Image Queue
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px] place-content-start overflow-auto">
        {queuedImages.map((image, index) => (
          <div key={index} className="relative group">
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
                  <img
                    src={image.preview}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    alt={image.file.name}
                  />
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    Image Preview
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 flex justify-center items-center">
                  <img
                    src={image.preview}
                    className="max-w-full h-auto rounded-lg shadow-md"
                    alt={image.file.name}
                  />
                </div>
                <DialogFooter className="mt-4 text-sm text-primary-foreground bg-primary p-4 rounded-xl">
                  {image.file.name}
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => handleRemoveImage(index)}
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <ConversionButtons />
    </div>
  );
}
