import { parseHtmlToMarkdownHelper } from "../helpers/helpers";

export const parseCheckboxToMarkdown = function (blocks) {
  let items = {};

  items = blocks.items.map((item) => {
    const text = parseHtmlToMarkdownHelper(item.text);
    if (item.checked === true) {
      return `- [x] ${text}`;
    }
    return `- [ ] ${text}`;
  });

  return items.join("\n");
};
