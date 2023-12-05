export const parseDelimiterToMarkdown = function () {
  const delimiter = "---";

  return delimiter.concat("\n");
};

export const parseMarkdownToDelimiter = function () {
  let delimiterData = {};

  delimiterData = {
    data: {
      items: [],
    },
    type: "delimiter",
  };

  return delimiterData;
};
