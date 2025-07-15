import type { Text, Link, Content } from '../lib/types';

export default function Content(content: Content) {
  return (
    content.map((item, i) => {
      const { type, children } = item;
      switch (type) {
        case 'paragraph': {
          if (children.length === 1 && children[0].text === '') {
            return <br key={i} />;
          }
          return <p key={i}>{renderTextChildren(children)}</p>;
        }
        case 'heading': {
          const fragment = renderTextChildren(children);
          switch (item.level) {
            case 1:
              return <h1 key={i}>{fragment}</h1>;
            case 2:
              return <h2 key={i}>{fragment}</h2>;
            case 3:
              return <h3 key={i}>{fragment}</h3>;
          }
        }
        case 'code': {
          const fragment = renderTextChildren(children);
          return <pre key={i}>{fragment}</pre>;
        }
        case 'quote': {
          const fragment = renderTextChildren(children);
          return <blockquote key={i}>{fragment}</blockquote>;
        }
        case 'list': {
          const listItems = children.map((child, i) => (
            <li key={i}>{renderTextChildren(child.children)}</li>
          ));
          if (item.format === 'ordered') {
            return <ol key={i}>{listItems}</ol>;
          } else if (item.format === 'unordered') {
            return <ul key={i}>{listItems}</ul>;
          }
        }
        default:
          return <div key={i}>{JSON.stringify(children)}</div>;
      }
    }) || []
  );
}

function renderTextChildren(children: (Text | Link)[]) {
  return children.map((child, i) => {
    if (child.type === 'link') {
      return (
        <a key={i} href={child.url}>
          {renderTextChildren(child.children)}
        </a>
      );
    }
    if (child.italic && child.bold) {
      return (
        <b key={i}>
          <i>{child.text}</i>
        </b>
      );
    } else if (child.italic) {
      return <i key={i}>{child.text}</i>;
    } else if (child.bold) {
      return <b key={i}>{child.text}</b>;
    } else if (child.underline) {
      return <u key={i}>{child.text}</u>;
    } else if (child.strikethrough) {
      return <s key={i}>{child.text}</s>;
    } else if (child.code) {
      return <code key={i}>{child.text}</code>;
    }
    return child.text;
  });
}
