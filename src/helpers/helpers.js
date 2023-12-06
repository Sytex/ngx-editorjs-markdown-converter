import { NodeHtmlMarkdown } from 'node-html-markdown'

export const parseHtmlToMarkdownHelper = (html) => {
  return  NodeHtmlMarkdown.translate(html);
};

export const parseRemarkToEditorjs = (remarkBlock) => {
  if (remarkBlock.children) {
    const text = remarkBlock.children
      .map((item) => parseRemarkToEditorjs(item))
      .join(" ");
    let extra = {};
    if (remarkBlock.type === "link") {
      extra = { url: remarkBlock.url };
    }
    return wrapTextType(remarkBlock.type, text, extra);
  }
  if (remarkBlock.type === "text") {
    return remarkBlock.value;
  }
};

export const wrapTextType = (type, text, extra) => {
  if (type === "strong") {
    return `<b>${text}</b>`;
  }
  if (type === "emphasis") {
    return `<i>${text}</i>`;
  }
  if (type === "link") {
    return `<a href="${extra.url}">${text}</a>`;
  }
  return text;
};