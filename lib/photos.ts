import { cache } from 'react';
import type { MediaFile } from './types';

function constructUrl(img: MediaFile) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set');
  }
  return (
    `https://res.cloudinary.com/${cloudName}/image/upload/fl_getinfo/` +
    img.provider_metadata?.public_id +
    img.ext
  );
}

async function getImageDimensions(url: string) {
  const res = await fetch(url);
  const { output } = (await res.json()) as {
    output: { width: number; height: number };
  };
  const { width, height } = output;
  return { width, height };
}

const getDimensions = cache(getImageDimensions);

export async function enhancePhotoWithDimensions(img: MediaFile) {
  const url = constructUrl(img);
  const { width, height } = await getDimensions(url);
  return { ...img, width, height };
}
