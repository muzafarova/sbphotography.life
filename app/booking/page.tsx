import type { Metadata } from 'next';

import { StrapiRequest } from '../../lib/api';
import {
  renderDynamicZone,
  type DynamicZoneBlock,
} from '../../components/DynamicZone';
import { MediaFile } from '../../lib/types';

export const metadata: Metadata = {
  title: 'Booking',
};

type Booking = {
  title: string;
  image: MediaFile;
  blocks: DynamicZoneBlock[];
};

export default async function Page() {
  const { data } = await StrapiRequest<Booking>(
    '/booking?populate[blocks][on][shared.media][populate]=image&populate[blocks][on][shared.rich-text][populate]=*'
  );

  return (
    <>
      {data && (
        <section>
          {data.image && <img src={data.image.url} width={595} height={533} />}
          <article>
            <h2>{data.title}</h2>
            {data.blocks.map(renderDynamicZone)}
          </article>
        </section>
      )}
    </>
  );
}
