import Image from 'next/image';

import type { MediaFile } from '../lib/types';
import RichTextMarkdown from './RichTextMarkdown';

type MediaBlock = {
  __component: 'shared.media';
  image: MediaFile;
};

type RichTextBlock = {
  __component: 'shared.rich-text';
  body: string;
};

export type DynamicZoneBlock = MediaBlock | RichTextBlock;

export function renderDynamicZone(block: DynamicZoneBlock, i: number) {
  switch (block.__component) {
    case 'shared.rich-text':
      return (
        <div key={i}>
          <RichTextMarkdown markdown={block.body} />
        </div>
      );
    case 'shared.media':
      return (
        <Image
          key={i}
          src={block.image.url}
          width={block.image.width / 2}
          height={block.image.height / 2}
          loading="lazy"
          alt={block.image.alternativeText || ''}
        />
      );
    default:
      return null;
  }
}
