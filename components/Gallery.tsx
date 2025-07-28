import Photo from '../components/Photo';
import type { MediaFile } from '../lib/types';

export default function Gallery({
  title,
  photos,
}: {
  title?: string;
  photos: MediaFile[];
}) {
  return (
    <div
      className={`grid gap-4 ${
        photos.length < 4 ? 'grid-cols-1 mx-auto' : 'md:grid-cols-2'
      }`}
    >
      {photos.map((photo, i) => (
        <div
          key={photo.url}
          // className={!(i % 3) ? 'col-span-2 row-span-2' : ''}
        >
          <Photo photo={photo} />
        </div>
      ))}
    </div>
  );
}
