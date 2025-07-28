'use client';

import { CldImage } from 'next-cloudinary';
import { MediaFile } from '../lib/types';

export default function Gallery({ photo }: { photo: MediaFile }) {
  return (
    <CldImage
      key={photo.id}
      src={photo.url}
      width={photo.width}
      height={photo.height}
      alt=""
      crop={{
        type: 'auto',
        aspectRatio: '16:9',
        gravity: 'face',
      }}
    />
  );
}
