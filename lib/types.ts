export interface StrapiError extends Error {}

export type Page = {
  title: string;
  slug: string;
  documentId: string;
  content: Content;
  illustration?: Image;
};

export type Portfolio = {
  title: string;
  slug: string;
  documentId: string;
  content: Content;
  photo_gallery: Gallery;
};

export type Gallery = {
  documentId: string;
  title: string;
  photos: null | Image[];
};

export type Image = {
  id: string;
  url: string;
  alternativeText: null | string;
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
