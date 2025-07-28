import Image from 'next/image';

import type { DynamicBlock } from '../lib/types';
import RichTextMarkdown from './RichTextMarkdown';

export default function Block({ block }: { block: DynamicBlock }) {
  switch (block.__component) {
    case 'shared.rich-text':
      return <RichTextMarkdown markdown={block.body} />;
    case 'shared.media':
      return (
        <img
          src={block.image.url}
          loading="lazy"
          alt={block.image.alternativeText || ''}
        />
      );
    default:
      return null;
  }
}
