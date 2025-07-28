import type { Metadata } from 'next';
import Image from 'next/image';

import { StrapiRequest, fetchGlobal } from '../../lib/api';
import type { MediaFile } from '../../lib/types';
import { enhancePhotoWithDimensions } from '../../lib/photos';
import RichTextMarkdown from '../../components/RichTextMarkdown';
import Heading from '../../components/Heading';
import ContactMe from '../../components/ContactMe';

type Booking = {
  title: string;
  image: MediaFile;
  column1: string;
  column2: string;
  services: { title: string; description: string }[];
};

const { data } = await StrapiRequest<Booking>('/booking?populate=*');
const { data: global } = await fetchGlobal();

export const metadata: Metadata = {
  title: data?.title || 'Booking',
};

const enhancedImage = data?.image
  ? await enhancePhotoWithDimensions(data.image)
  : null;

export default async function Page() {
  return (
    <>
      {data && (
        <section className="max-w-7xl mx-auto pb-20">
          <Heading>{data.title}</Heading>
          <div className="flex flex-wrap gap-15 space-around w-full justify-around px-8">
            <div className="max-w-60 space-y-5">
              {enhancedImage && (
                <Image
                  src={enhancedImage.url}
                  width={enhancedImage?.width / 2}
                  height={enhancedImage?.height / 2}
                  alt={enhancedImage.alternativeText || ''}
                />
              )}
              <div className="text-center">
                <ContactMe
                  whatsappLink={global?.whatsappLink}
                  calendarLink={global?.calendarLink}
                >
                  Travel included within 90 minutes round-trip by car: please
                  enquire for travel further afield.
                </ContactMe>
              </div>
            </div>
            {data.services.map((service) => (
              <div
                key={service.title}
                className="flex-[1_1_220px] max-w-[600px]"
              >
                <h2 className="italic">{service.title}</h2>
                <RichTextMarkdown markdown={service.description} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
