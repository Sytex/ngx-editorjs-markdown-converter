import { parseHeaderToMarkdown } from "../bloc-type-parsers/header-type-parser";
import { parseParagraphToMarkdown } from "../bloc-type-parsers/paragraph-type-parser";
import { parseListToMarkdown } from "../bloc-type-parsers/list-type-parser";
import { parseDelimiterToMarkdown } from "../bloc-type-parsers/delimiter-type-parser";
import { parseImageToMarkdown } from "../bloc-type-parsers/image-type-parser";
import { parseQuoteToMarkdown } from "../bloc-type-parsers/quote-type-parser";
import { parseCheckboxToMarkdown } from "../bloc-type-parsers/checkbox-type-parser";
import { parseCodeToMarkdown } from "../bloc-type-parsers/code-type-parser";

export default class MdParser {
  constructor() {}

  parse(data) {
    const initialData = {};

    initialData.content = data.blocks;
    const parsedData = initialData.content.map((item) => {
      // iterate through editor data and parse the single blocks to markdown syntax
      switch (item.type) {
        case "header":
          return parseHeaderToMarkdown(item.data);
        case "paragraph":
          return parseParagraphToMarkdown(item.data);
        case "list":
          return parseListToMarkdown(item.data);
        case "delimiter":
          return parseDelimiterToMarkdown(item);
        case "image":
          return parseImageToMarkdown(item.data);
        case "quote":
          return parseQuoteToMarkdown(item.data);
        case "checkbox":
          return parseCheckboxToMarkdown(item.data);
        case "code":
          return parseCodeToMarkdown(item.data);
        case "checklist":
          return parseCheckboxToMarkdown(item.data);
        default:
          break;
      }
    });
    return parsedData.join("\n");
  }
}
