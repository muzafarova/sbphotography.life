import Image from 'next/image';
import type { MediaFile } from '../lib/types';

// https://marked.js.org/using_advanced#options
import Markdown from 'marked-react';

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
      return <Markdown key={i}>{block.body}</Markdown>;
    case 'shared.media':
      return (
        <Image
          key={i}
          src={block.image.url}
          width={595}
          height={533}
          loading="lazy"
          alt={block.image.alternativeText || ''}
        />
      );
    default:
      return null;
  }
}
