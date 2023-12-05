export const parseCodeToMarkdown = function (blocks) {
  return `\`\`\`\n${blocks.code}\n\`\`\`\n`;
};

export const parseMarkdownToCode = function (blocks) {
  const codeData = {
    data: {
      code: blocks.value,
    },
    type: "code",
  };

  return codeData;
};
