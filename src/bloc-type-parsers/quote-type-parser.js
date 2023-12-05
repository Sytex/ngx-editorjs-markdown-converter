export const parseQuoteToMarkdown = function (blocks) {
  return `> ${blocks.text}\n`;
};

export const parseMarkdownToQuote = function (blocks) {
  let quoteData = {};

  blocks.children.forEach((items) => {
    items.children.forEach((listItem) => {
      if (listItem.type === "text") {
        quoteData = {
          data: {
            alignment: "left",
            caption: "",
            text: listItem.value,
          },
          type: "quote",
        };
      }
    });
  });

  return quoteData;
};
