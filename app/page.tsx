import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchAllGalleries } from '../lib/api';

export const metadata: Metadata = {
  title: 'Documenting The Art of Life',
};

export default async function Page() {
  const SCALE = 2;
  const { data: featured } = await fetchAllGalleries();

  return (
    <div>
      {featured &&
        featured.map((gallery) => (
          <section key={gallery.documentId}>
            <h2>{gallery.title}</h2>
            <div className="gallery">
              {gallery.photos &&
                gallery.photos.map((img) => (
                  <Image
                    key={img.id}
                    src={img.url}
                    alt={img.alternativeText || ''}
                    width={192 * SCALE}
                    height={128 * SCALE}
                    loading="lazy"
                  />
                ))}
            </div>
          </section>
        ))}
    </div>
  );
}
