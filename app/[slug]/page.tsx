import {
  fetchAllPortfolios,
  fetchPortfolioBySlug,
  fetchGalleryByDocumentId,
  fetchGlobal,
} from '../../lib/api';

import { enhancePhotoWithDimensions } from '../../lib/photos';
import type { MediaFile } from '../../lib/types';

import RichTextMarkdown from '../../components/RichTextMarkdown';
import Gallery from '../../components/Gallery';
import Heading from '../../components/Heading';
import ContactMe from '../../components/ContactMe';

const { data: portfolios } = await fetchAllPortfolios();
const { data: global } = await fetchGlobal();

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
  const { data: portfolio } = await fetchPortfolioBySlug(slug);

  return {
    title: portfolio?.seo?.metaTitle || portfolio?.title,
    description: portfolio?.seo?.metaDescription || portfolio?.content,
  };
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
    photos = await Promise.all(
      (gallery?.photos || []).map(enhancePhotoWithDimensions)
    );
  }

  return (
    <section className="max-w-7xl mx-auto pb-20">
      {portfolio && (
        <>
          <Heading>{portfolio.title}</Heading>

          <div className="flex flex-wrap gap-10 justify-center items-start md:pr-5">
            <div className="max-w-[600px] px-5 md:px-0">
              <Gallery title={portfolio?.title} photos={photos} />
            </div>
            <div className="max-w-96 text-left space-y-10">
              {portfolio.services.map((service) => (
                <div
                  key={service.title}
                  className="block p-5 bg-stone-100 text-center text-sm border-b-2 border-stone-200"
                >
                  <h3 className="italic">{service.title}</h3>
                  <RichTextMarkdown markdown={service.description} />
                </div>
              ))}

              <div className="text-center mx-auto">
                <ContactMe
                  whatsappLink={global?.whatsappLink}
                  calendarLink={global?.calendarLink}
                />
              </div>

              {portfolio.content && (
                <>
                  <div className="text-justify">
                    <RichTextMarkdown markdown={portfolio.content} />
                  </div>
                  <div className="-ml-1">
                    <ContactMe
                      whatsappLink={global?.whatsappLink}
                      calendarLink={global?.calendarLink}
                    >
                      Please note I only take on a limited number of weddings
                      per year so will be subject to availability.
                    </ContactMe>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
