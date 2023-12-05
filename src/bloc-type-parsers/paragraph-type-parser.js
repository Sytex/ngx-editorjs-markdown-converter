import {
  parseHtmlToMarkdownHelper,
  parseRemarkToEditorjs,
} from "../helpers/helpers";

export const parseParagraphToMarkdown = function (blocks) {
  const text = parseHtmlToMarkdownHelper(blocks.text);
  return `${text}\n`;
};

export const parseMarkdownToParagraph = function (blocks) {
  const text = blocks.children
    .map((item) => {
      if (item.type !== "image") {
        return parseRemarkToEditorjs(item);
      }
    })
    .join(" ");
  return {
    data: {
      text: text,
    },
    type: "paragraph",
  };
};
