import { fromMarkdown } from "mdast-util-from-markdown";
import { gfm } from "micromark-extension-gfm";
import { gfmFromMarkdown } from "mdast-util-gfm";

import { parseMarkdownToHeader } from "../bloc-type-parsers/header-type-parser";
import { parseMarkdownToParagraph } from "../bloc-type-parsers/paragraph-type-parser";
import { parseMarkdownToList } from "../bloc-type-parsers/list-type-parser";
import { parseMarkdownToDelimiter } from "../bloc-type-parsers/delimiter-type-parser";
import { parseMarkdownToCode } from "../bloc-type-parsers/code-type-parser";
import { parseMarkdownToQuote } from "../bloc-type-parsers/quote-type-parser";

/**
 * Markdown Import class
 */
export default class MdImporter {
  /**
   * creates the Importer plugin
   * {editorData, api functions} - necessary to interact with the editor
   */
  constructor() {}

  /**
   * Function which parses markdown file to JSON which correspons the the editor structure
   * @return Parsed markdown in JSON format
   */
  import(content) {
    const parsedMarkdown = fromMarkdown(content, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()],
    });

    const blocks = parsedMarkdown.children
      .map((item) => {
        switch (item.type) {
          case "heading":
            return parseMarkdownToHeader(item);
          case "paragraph":
            return parseMarkdownToParagraph(item);
          case "list":
            return parseMarkdownToList(item);
          case "thematicBreak":
            return parseMarkdownToDelimiter();
          case "code":
            return parseMarkdownToCode(item);
          case "blockquote":
            return parseMarkdownToQuote(item);
          default:
            break;
        }
      })
      .filter((value) => Object.keys(value).length !== 0)
      .flat();

    return { time: Date(), blocks: blocks };
  }
}
