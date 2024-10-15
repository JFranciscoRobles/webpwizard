import { atom } from 'jotai';

export const queuedImagesAtom = atom<QueuedImage[]>([]);
export const convertedImagesAtom = atom<ConvertedImage[]>([]);
export const qualityAtom = atom<number>(80);
export const resizePercentageAtom = atom<number>(100);
export const filePrefixAtom = atom<string>('');
export const outputFormatAtom = atom<string>('webp');
export const isConvertingAtom = atom<boolean>(false);

interface QueuedImage {
  file: File;
  preview: string;
}

interface ConvertedImage {
  url: string;
  fileName: string;
  originalName: string;
  originalSize: number;
  convertedSize: number;
  status: 'queued' | 'converting' | 'done';
  progress: number;
}
