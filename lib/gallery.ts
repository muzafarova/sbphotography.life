import type { MediaFile } from './types';

function constructUrl(img: MediaFile) {
  return (
    'https://res.cloudinary.com/dw6sp6mcv/image/upload/fl_getinfo/' +
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

export async function enhancePhotosWithDimensions(photos: MediaFile[]) {
  return await Promise.all(
    photos.map(async (img) => {
      const url = constructUrl(img);
      const { width, height } = await getImageDimensions(url);
      return { ...img, width, height };
    })
  );
}
