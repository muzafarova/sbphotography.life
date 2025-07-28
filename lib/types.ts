export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
};

export type Global = {
  siteName: string;
  siteDescription: string;
  whatsappLink?: string;
  calendarLink?: string;
};

export type About = {
  title: string;
  content: string;
  image: MediaFile;
  seo: Seo | null;
};

export type Portfolio = {
  title: string;
  slug: string;
  documentId: string;
  content?: string;
  gallery?: Gallery;
  services: { title: string; description: string }[];
  seo: Seo | null;
};

export type Gallery = {
  documentId: string;
  title: string;
  photos: MediaFile[];
};

export type MediaFile = {
  id: string;
  url: string;
  ext: string;
  width: number;
  height: number;
  alternativeText: null | string;
  provider_metadata: {
    public_id: string;
  };
};

export type MediaBlock = {
  __component: 'shared.media';
  image: MediaFile;
};

export type RichTextBlock = {
  __component: 'shared.rich-text';
  body: string;
};

export type DynamicBlock = MediaBlock | RichTextBlock;

export type Text = {
  type: 'text';
  text: string;
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type Link = {
  type: 'link';
  url: string;
  children: Text[];
};

type Heading = {
  type: 'heading';
  level: 1 | 2 | 3;
  children: (Text | Link)[];
};

type Paragraph = {
  type: 'paragraph';
  children: Text[];
};

type ListItem = {
  type: 'list-item';
  children: Text[];
};

type Blockquote = {
  type: 'quote';
  children: Text[];
};

type CodeBlock = {
  type: 'code';
  children: Text[];
  language: string;
};

type List = {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItem[];
};

export type Content = (Heading | Paragraph | List | Blockquote | CodeBlock)[];
