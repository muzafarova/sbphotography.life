import { cache } from 'react';

import {
  fetchAllPortfolios,
  fetchPortfolioBySlug,
  fetchGalleryByDocumentId,
} from '../../lib/api';

import { enhancePhotoWithDimensions } from '../../lib/photos';
import type { MediaFile } from '../../lib/types';

import RichTextMarkdown from '../../components/RichTextMarkdown';
import Gallery from '../../components/Gallery';

const { data: portfolios } = await fetchAllPortfolios();

// Memoizing data requests
// https://nextjs.org/docs/app/getting-started/metadata-and-og-images#memoizing-data-requests
const getPortfolio = cache(
  async (slug: string) => await fetchPortfolioBySlug(slug)
);

// Return a list of `params` to populate the [slug] dynamic segment
// [] will result in build error due to https://nextjs.org/docs/app/guides/static-exports#unsupported-features
export async function generateStaticParams() {
  return portfolios || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: portfolio } = await getPortfolio(slug);

  // TODO replace with meta tags
  return {
    title: portfolio?.title,
    description: portfolio?.content,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: portfolio } = await getPortfolio(slug);

  const galleryDocumentId = portfolio?.gallery?.documentId;
  let photos: MediaFile[] = [];
  if (galleryDocumentId) {
    const { data: gallery } = await fetchGalleryByDocumentId(galleryDocumentId);
    photos = await Promise.all(
      (gallery?.photos || []).map(enhancePhotoWithDimensions)
    );
  }

  return (
    <>
      {<Gallery gallery={{ photos }} />}
      {portfolio && <RichTextMarkdown markdown={portfolio.content} />}
    </>
  );
}
