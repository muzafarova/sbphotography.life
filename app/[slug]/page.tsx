import {
  fetchAllPortfolios,
  fetchPortfolioBySlug,
  fetchGalleryByDocumentId,
} from '../../lib/api';

import { enhancePhotosWithDimensions } from '../../lib/gallery';
import type { MediaFile } from '../../lib/types';

import RichTextMarkdown from '../../components/RichTextMarkdown';
import Gallery from '../../components/Gallery';

// Return a list of `params` to populate the [slug] dynamic segment
// [] will result in build error due to https://nextjs.org/docs/app/guides/static-exports#unsupported-features
export async function generateStaticParams() {
  const { data: portfolios } = await fetchAllPortfolios();
  return portfolios || [];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: portfolio } = await fetchPortfolioBySlug(slug);

  const galleryDocumentId = portfolio?.gallery?.documentId;
  let photos: MediaFile[] = [];
  if (galleryDocumentId) {
    const { data: gallery } = await fetchGalleryByDocumentId(galleryDocumentId);
    photos = await enhancePhotosWithDimensions(gallery?.photos || []);
  }

  return (
    <>
      {<Gallery gallery={{ photos }} />}

      {portfolio && RichTextMarkdown(portfolio.content)}
    </>
  );
}
