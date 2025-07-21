import type { Metadata } from 'next';
import Image from 'next/image';

import { StrapiRequest } from '../../lib/api';
import { MediaFile } from '../../lib/types';
import RichTextMarkdown from '../../components/RichTextMarkdown';

export const metadata: Metadata = {
  title: 'About',
};

type About = {
  title: string;
  content: string;
  image: MediaFile;
};

export default async function Page() {
  const { data, error } = await StrapiRequest<About>('/about', {
    populate: ['image'],
  });

  return (
    <>
      {data && (
        <section>
          <h2>{data.title}</h2>
          {data.image && (
            <Image src={data.image.url} width={595} height={533} alt="" />
          )}
          {RichTextMarkdown(data.content)}
        </section>
      )}
    </>
  );
}
