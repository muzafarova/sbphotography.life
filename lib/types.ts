export type Page = {
  title: string;
  slug: string;
  documentId: string;
  content: Content;
  illustration?: MediaFile;
};

export type Portfolio = {
  title: string;
  slug: string;
  documentId: string;
  content?: string;
  gallery?: Gallery;
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
