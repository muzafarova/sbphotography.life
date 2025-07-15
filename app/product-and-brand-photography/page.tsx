import type { Metadata } from 'next';
import Image from 'next/image';
import {
  fetchPortfolioByDocumentId,
  fetchGalleryByDocumentId,
} from '../../lib/api';
import Content from '../../components/Content';

export const metadata: Metadata = {
  title: 'Product and Brand Photography',
};

export default async function Page() {
  const { data: portfolio, error: portfolioError } =
    await fetchPortfolioByDocumentId('e38tn87ou2rt3s1b1j1t9z9k');

  if (!portfolio) {
    return;
  }

  const { data: gallery, error: galleryError } = await fetchGalleryByDocumentId(
    portfolio['photo_gallery'].documentId
  );

  const SCALE = 2;

  return (
    <div>
      {/* TODO display portfolio error nicely */}
      {portfolioError && (
        <details>
          <summary>portfolioError: {portfolioError.message}</summary>
          <pre>{JSON.stringify(portfolioError)}</pre>
        </details>
      )}

      {/* TODO display gallery error nicely */}
      {galleryError && (
        <details>
          <summary>galleryError: {galleryError.message}</summary>
          <pre>{JSON.stringify(galleryError)}</pre>
        </details>
      )}

      {portfolio && (
        <>
          <h2>{portfolio.title}</h2>

          {gallery && (
            <section>
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
          )}

          {portfolio.content && Content(portfolio.content)}
        </>
      )}
    </div>
  );
}
