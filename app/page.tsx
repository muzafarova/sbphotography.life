import type { Metadata } from 'next';
import { fetchAllGalleries } from '../lib/api';
import Gallery from '../components/Gallery';
import type { MediaFile } from '../lib/types';
import { enhancePhotoWithDimensions } from '../lib/photos';

export const metadata: Metadata = {
  title: 'Documenting The Art of Life',
};

export default async function Page() {
  const { data: featuredGalleries, error } = await fetchAllGalleries();
  let photos: MediaFile[] = [];
  if (featuredGalleries) {
    photos = (
      await Promise.all(
        featuredGalleries.map(
          async (gallery) =>
            await Promise.all(gallery.photos.map(enhancePhotoWithDimensions))
        )
      )
    ).flat();
  }
  return (
    <div>
      {/* TODO display error nicely */}
      {error && <pre>{JSON.stringify(error)}</pre>}

      {featuredGalleries &&
        featuredGalleries.map((gallery) => (
          <section key={gallery.documentId}>
            <h2>{gallery.title}</h2>
            <Gallery gallery={{ ...gallery, photos }} />
          </section>
        ))}
    </div>
  );
}
