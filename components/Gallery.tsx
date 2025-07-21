'use client';

import { CldImage } from 'next-cloudinary';
import { MediaFile } from '../lib/types';

export default function Gallery({
  gallery,
}: {
  gallery: {
    photos: MediaFile[];
  };
}) {
  return (
    <>
      {gallery.photos.map((img) => {
        return (
          <CldImage
            key={img.id}
            src={img.url}
            width={img.width / 2}
            height={img.height / 2}
            alt=""
          />
        );
      })}
    </>
  );
}
