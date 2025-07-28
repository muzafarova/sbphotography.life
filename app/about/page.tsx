import type { Metadata } from 'next';
import Image from 'next/image';

import { StrapiRequest } from '../../lib/api';
import { About } from '../../lib/types';
import RichTextMarkdown from '../../components/RichTextMarkdown';
import Heading from '../../components/Heading';
import { enhancePhotoWithDimensions } from '../../lib/photos';

const { data } = await StrapiRequest<About>('/about', {
  populate: ['*'],
});

export const metadata: Metadata = {
  title: data?.seo?.metaTitle || data?.title,
  description: data?.seo?.metaDescription || data?.content.split('\n')[0],
};

export default async function Page() {
  const enhancedImage = data?.image
    ? await enhancePhotoWithDimensions(data.image)
    : null;
  return (
    <>
      {data && (
        <section className="max-w-7xl mx-auto pb-20">
          <Heading>{data.title}</Heading>
          <div className="flex flex-wrap gap-12 justify-center items-start mb-20">
            {enhancedImage && (
              <div>
                <Image
                  src={enhancedImage.url}
                  width={enhancedImage?.width / 2}
                  height={enhancedImage?.height / 2}
                  alt={enhancedImage.alternativeText || ''}
                />
              </div>
            )}
            <div className="w-80 shrink-0">
              <div className="text-base text-left">
                <RichTextMarkdown markdown={data.content} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
