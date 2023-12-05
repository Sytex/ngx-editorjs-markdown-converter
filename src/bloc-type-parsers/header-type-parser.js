import {
  parseHtmlToMarkdownHelper,
  parseRemarkToEditorjs,
} from "../helpers/helpers";

export const parseHeaderToMarkdown = function (blocks) {
  const text = parseHtmlToMarkdownHelper(blocks.text);
  switch (blocks.level) {
    case 1:
      return `# ${text}\n`;
    case 2:
      return `## ${text}\n`;
    case 3:
      return `### ${text}\n`;
    case 4:
      return `#### ${text}\n`;
    case 5:
      return `##### ${text}\n`;
    case 6:
      return `###### ${text}\n`;
    default:
      break;
  }
};

export const parseMarkdownToHeader = function (blocks) {
  const text = blocks.children
    .map((item) => {
      return parseRemarkToEditorjs(item);
    })
    .join(" ");
  return {
    data: {
      level: blocks.depth,
      text: text,
    },
    type: "header",
  };
};
