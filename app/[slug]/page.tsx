import type { Metadata } from 'next';
import {
  fetchAllPages,
  fetchPageBySlug,
  fetchAllPortfolios,
  fetchPortfolioBySlug,
  fetchGalleryByDocumentId,
} from '../../lib/api';

import Image from 'next/image';
import Content from '../../components/Content';

export const metadata: Metadata = {
  title: 'Dynamic page',
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const { data: portfolios } = await fetchAllPortfolios();
  const { data: pages } = await fetchAllPages();
  const items: { slug: string }[] = [];

  if (Array.isArray(portfolios)) {
    items.push(...portfolios);
  }

  if (Array.isArray(pages)) {
    items.push(...pages);
  }

  return items.map((item) => ({
    slug: item.slug,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: portfolio, error: portfolioError } = await fetchPortfolioBySlug(
    slug
  );
  const galleryDocumentId = portfolio?.['photo_gallery']?.documentId;
  let gallery = null;
  if (galleryDocumentId) {
    const { data } = await fetchGalleryByDocumentId(galleryDocumentId);
    gallery = data;
  }
  const { data: page, error: pageError } = await fetchPageBySlug(slug);

  // TODO display errors nicely
  console.log('fetchPortfolioBySlug', portfolio, portfolioError);
  console.log('fetchPageBySlug', page, pageError);

  return (
    <div>
      <p>slug: {slug}</p>
      {gallery && (
        <section>
          <div className="gallery">
            {gallery.photos &&
              gallery.photos.map((img) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt={img.alternativeText || ''}
                  width={192}
                  height={128}
                  loading="lazy"
                />
              ))}
          </div>
        </section>
      )}
      {portfolio && Content(portfolio.content)}

      {page && Content(page.content)}
    </div>
  );
}
