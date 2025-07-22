import type { Metadata } from 'next';

import { StrapiRequest } from '../../lib/api';
import {
  renderDynamicZone,
  type DynamicZoneBlock,
} from '../../components/DynamicZone';
import { MediaFile } from '../../lib/types';
import { enhancePhotoWithDimensions } from '../../lib/photos';

type Booking = {
  title: string;
  image: MediaFile;
  blocks: DynamicZoneBlock[];
};

const { data } = await StrapiRequest<Booking>(
  '/booking?populate[blocks][on][shared.media][populate]=image&populate[blocks][on][shared.rich-text][populate]=*'
);

const enhancedBlocks = await Promise.all(
  [...(data?.blocks || [])].map(async (block) =>
    block.__component === 'shared.media'
      ? { ...block, image: await enhancePhotoWithDimensions(block.image) }
      : block
  )
);

export const metadata: Metadata = {
  title: data?.title || 'Booking',
};

export default async function Page() {
  return (
    <>
      {data && (
        <section>
          <article>
            <h2>{data.title}</h2>
            {enhancedBlocks.map(renderDynamicZone)}
          </article>
        </section>
      )}
    </>
  );
}
