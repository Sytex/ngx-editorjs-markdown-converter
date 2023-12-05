export const parseImageToMarkdown = function (blocks) {
  return `![${blocks.caption}](${blocks.url} "${blocks.caption}")`.concat("\n");
};
