// https://marked.js.org/using_advanced#options
import Markdown from 'marked-react';

export default function RichTextMarkdown(markdown?: string) {
  return <Markdown>{markdown}</Markdown>;
}
