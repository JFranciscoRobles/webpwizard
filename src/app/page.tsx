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
    <div className="container mx-auto px-6 md:px-12 mt-12">
      {/* Header */}
      <header className="flex justify-center mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-center text-indigo-600 tracking-wide">
          Webp Wizard
        </h1>
      </header>

      {/* Intro Section */}
      <section className="w-full mb-8">
        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-md text-center">
          <p className="text-base md:text-lg text-gray-800">
            Webp Wizard lets you convert images to WebP, PNG, or JPG directly in
            your browser. All conversions happen locally, ensuring privacy with{" "}
            <strong>no uploads</strong> to servers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full p-8 bg-gray-100 rounded-xl  shadow-lg grid gap-8 grid-cols-1 lg:grid-cols-[min-content,1fr] min-h-[80vh]">
        {/* Output Settings */}
        <div className="min-w-64">
          <OutputSettings />
        </div>

        {/* File Upload or Image Lists */}
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

      {/* Footer */}
      <footer className="mt-12 text-center space-y-6">
        <ul className="text-base text-gray-700 space-y-2">
          <li>
            Convert images to <strong>WebP, PNG, or JPG</strong>. Note that the
            <strong> quality setting</strong> is not applicable for PNG outputs.
          </li>
          <li>
            All processes are handled <strong>locally on your device</strong>,
            ensuring that your images are <strong>never uploaded</strong>.
          </li>
          <li>
            Want to contribute? Visit our <strong>GitHub Repository</strong>.
          </li>
        </ul>

        <div className="flex justify-center space-x-6 text-gray-600">
          <a
            href="https://github.com/JFranciscoRobles/webpwizard"
            aria-label="GitHub - Webpwizard Repository"
            className="hover:text-indigo-600 transition"
          >
            <GithubIcon size={32} />
          </a>
        </div>
      </footer>
    </div>
  );
}
