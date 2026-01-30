import { atom } from 'jotai';
import type { QueuedImage, ConvertedImage, OutputFormat } from '@/types';

export const queuedImagesAtom = atom<QueuedImage[]>([]);
export const convertedImagesAtom = atom<ConvertedImage[]>([]);
export const qualityAtom = atom<number>(80);
export const resizePercentageAtom = atom<number>(100);
export const filePrefixAtom = atom<string>('');
export const outputFormatAtom = atom<OutputFormat>('webp');
export const isConvertingAtom = atom<boolean>(false);
