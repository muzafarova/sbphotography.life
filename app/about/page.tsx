import type { Metadata } from 'next';
import Image from 'next/image';

import { StrapiRequest } from '../../lib/api';
import { MediaFile } from '../../lib/types';
import RichTextMarkdown from '../../components/RichTextMarkdown';
import { enhancePhotoWithDimensions } from '../../lib/photos';

type About = {
  title: string;
  content: string;
  image: MediaFile;
};

const { data } = await StrapiRequest<About>('/about', {
  populate: ['image'],
});

export const metadata: Metadata = {
  title: data?.title || 'About',
};

export default async function Page() {
  const enhancedImage = data?.image
    ? await enhancePhotoWithDimensions(data.image)
    : null;
  return (
    <>
      {data && (
        <section>
          <h2>{data.title}</h2>
          {enhancedImage && (
            <Image
              src={enhancedImage.url}
              width={enhancedImage?.width / 2}
              height={enhancedImage?.height / 2}
              alt=""
            />
          )}
          <RichTextMarkdown markdown={data.content} />
        </section>
      )}
    </>
  );
}
