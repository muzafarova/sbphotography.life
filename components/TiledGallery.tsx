import Photo from '../components/Photo';
import type { MediaFile } from '../lib/types';

function chunkArray(arr: MediaFile[]) {
  const imgs = [arr.slice(5), arr.slice(0, 2), arr.slice(2, 5)].reverse();
  console.log(
    imgs.map((photos) => photos.map(({ width, height }) => ({ width, height })))
  );
  return imgs;
}

export default function TiledGallery({
  title,
  photos,
}: {
  title?: string;
  photos: MediaFile[];
}) {
  return (
    <section className="py-8">
      {title && <h1 className="text-2xl font-normal mb-8">{title}</h1>}
      <div className="items-center grid grid-cols-11 gap-4">
        {chunkArray(photos.reverse()).map((photos, i) => (
          <div
            key={i}
            className={`items-center gap-4 ${
              photos.length === 2
                ? 'col-span-3 grid grid-cols-1 justify-items-center'
                : 'col-span-4 grid grid-cols-2 '
            }`}
          >
            {photos.map((photo) => (
              <div
                key={photo.url}
                className={photo.width > 1900 ? 'col-span-2' : ''}
              >
                <Photo key={photo.url} photo={photo} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
