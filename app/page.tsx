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

      {featuredGalleries &&
        featuredGalleries.map((gallery) => (
          <section key={gallery.documentId} className="mb-8">
            <h1 className="text-2xl font-normal mb-8">{gallery.title}</h1>
            <div className="px-4">
              <Gallery title={gallery.title} photos={photos} />
            </div>
          </section>
        ))}

      <section className="bg-stone-100">
        <a className="block pt-12 text-xl font-medium" href="https://www.instagram.com/sarahbarlowphotography" target="_blank">
          Follow Sarah in instagram{' '}
          <span className="font-medium text-sky-600">
            @sarahbarlowphotography
            </span>
          </a>
        <iframe
          src="https://embedsocial.com/api/pro_hashtag/69df190034115686f9f3a422c97ee13efba8f0ae"
          className="w-full h-120"
        />
      </section>
    </div>
  );
}
