"use client";
import { ConvertedImagesList } from "@/components/converted-images-list";
import FileUpload from "@/components/file-upload";
import OutputSettings from "@/components/output-settings";
import QueuedImages from "@/components/queued-images";
import {
  convertedImagesAtom,
  isConvertingAtom,
  queuedImagesAtom,
} from "@/context/atom";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { GithubIcon } from "lucide-react";

export default function Home() {
  const queuedImages = useAtomValue(queuedImagesAtom);
  const convertedImages = useAtomValue(convertedImagesAtom);
  const isConverting = useAtomValue(isConvertingAtom);

  return (
    <div className="container mx-auto px-4 md:px-8 mt-10">
      <header className="flex justify-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase text-center">
          Webp Wizard
        </h1>
      </header>

      <section className="w-full mb-6">
        <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg text-center shadow-sm">
          <p className="text-sm md:text-base text-gray-700">
            Webp Wizard is a tool for converting images to WebP, PNG, or JPG
            directly in your browser. All conversions happen locally, ensuring
            privacy, with no files uploaded to servers.
          </p>
        </div>
      </section>

      <div className="w-full p-6 bg-secondary rounded-lg shadow-xl grid gap-6 grid-cols-1 lg:grid-cols-[min-content,1fr] min-h-[600px]">
        <div className="min-w-64">
          <OutputSettings />
        </div>

        <div className="min-w-64">
          {!convertedImages?.length && !queuedImages?.length && <FileUpload />}

          {queuedImages.length > 0 && (
            <div className={cn(!isConverting ? "block" : "hidden")}>
              <QueuedImages />
            </div>
          )}

          {convertedImages.length > 0 && <ConvertedImagesList />}
        </div>
      </div>

      <div className="mt-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "90px" }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot="XXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <footer className="mt-10 text-center space-y-4">
        <ul className="text-sm text-gray-600">
          <li>
            You can convert images to <strong>WebP, PNG, and JPG</strong>.
            Please note that the <strong>quality option</strong> does not apply
            to PNG outputs.
          </li>
          <li>
            All processes are performed <strong>locally on your device</strong>,
            meaning images are <strong>never uploaded</strong> to any servers.
          </li>
          <li>
            Want to contribute? Check out the project on <strong>GitHub</strong>
            .
          </li>
        </ul>

        <div className="flex justify-center space-x-6 text-2xl text-gray-700">
          <a
            href="https://github.com/JFranciscoRobles/webpwizard"
            aria-label="GitHub - Webpwizard Repository"
          >
            <GithubIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}
