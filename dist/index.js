var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/helpers/editorjs-md-importer.js
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfm } from "micromark-extension-gfm";
import { gfmFromMarkdown } from "mdast-util-gfm";

// src/helpers/helpers.js
import TurndownService from "turndown";
var turndownService = new TurndownService();
var parseHtmlToMarkdownHelper = (html) => {
  return turndownService.turndown(html);
};
var parseRemarkToEditorjs = (remarkBlock) => {
  if (remarkBlock.children) {
    const text = remarkBlock.children.map((item) => parseRemarkToEditorjs(item)).join(" ");
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
var wrapTextType = (type, text, extra) => {
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

// src/bloc-type-parsers/header-type-parser.js
var parseHeaderToMarkdown = function(blocks) {
  const text = parseHtmlToMarkdownHelper(blocks.text);
  switch (blocks.level) {
    case 1:
      return `# ${text}
`;
    case 2:
      return `## ${text}
`;
    case 3:
      return `### ${text}
`;
    case 4:
      return `#### ${text}
`;
    case 5:
      return `##### ${text}
`;
    case 6:
      return `###### ${text}
`;
    default:
      break;
  }
};
var parseMarkdownToHeader = function(blocks) {
  const text = blocks.children.map((item) => {
    return parseRemarkToEditorjs(item);
  }).join(" ");
  return {
    data: {
      level: blocks.depth,
      text
    },
    type: "header"
  };
};

// src/bloc-type-parsers/paragraph-type-parser.js
var parseParagraphToMarkdown = function(blocks) {
  const text = parseHtmlToMarkdownHelper(blocks.text);
  return `${text}
`;
};
var parseMarkdownToParagraph = function(blocks) {
  const text = blocks.children.map((item) => {
    if (item.type !== "image") {
      return parseRemarkToEditorjs(item);
    }
  }).join(" ");
  return {
    data: {
      text
    },
    type: "paragraph"
  };
};

// src/bloc-type-parsers/list-type-parser.js
var parseListToMarkdown = function(blocks) {
  let items = {};
  switch (blocks.style) {
    case "unordered":
      items = blocks.items.map((item) => {
        const itemMd = parseHtmlToMarkdownHelper(item);
        return `- ${itemMd}`;
      }).join("\n");
      return items;
    case "ordered":
      items = blocks.items.map((item, index) => {
        const itemMd = parseHtmlToMarkdownHelper(item);
        return `${index + 1}. ${itemMd}`;
      }).join("\n");
      return items;
    default:
      break;
  }
};
var parseMarkdownToList = function(blocks) {
  const replace = (array, index, value) => {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
  };
  const getNewGroup = (actualItem, isCheckList) => {
    const group = {
      data: {
        items: [actualItem]
      },
      type: isCheckList ? "checklist" : "list"
    };
    if (!isCheckList) {
      group.data.style = blocks.ordered ? "ordered" : "unordered";
    }
    return group;
  };
  const getUpdatedBlock = (prevGroup, actualItem) => {
    const updatedData = __spreadProps(__spreadValues({}, prevGroup.data), {
      items: [...prevGroup.data.items, actualItem]
    });
    const updatedCurrent = __spreadProps(__spreadValues({}, prevGroup), {
      data: updatedData
    });
    return updatedCurrent;
  };
  const getLists = (blocks2) => {
    return blocks2.children.reduce((prev, actualItem) => {
      var _a;
      const prevGroup = getLastItem(prev);
      const prevIndex = prev.length > 0 ? prev.length - 1 : 0;
      const prevLength = (_a = prev == null ? void 0 : prev.length) != null ? _a : 0;
      let prevItem = null;
      if (prevLength > 0) {
        prevItem = getLastItem(prev[prevIndex].data.items);
      }
      const hasChanged = listHasChanged(prevItem, actualItem);
      const isCheckList = actualItem.checked !== null;
      if (hasChanged) {
        const group = getNewGroup(actualItem, isCheckList);
        return [...prev, group];
      }
      const updatedCurrent = getUpdatedBlock(prevGroup, actualItem);
      return replace(prev, prevIndex, updatedCurrent);
    }, []);
  };
  const parseLists = (itemDataGroup2) => {
    return itemDataGroup2.map((list2) => {
      if (list2.type === "list") {
        const items = list2.data.items.map((item) => {
          return getItemListValue(item.children);
        });
        const data2 = __spreadProps(__spreadValues({}, list2.data), { items });
        return __spreadProps(__spreadValues({}, list2), { data: data2 });
      }
      const checkboxes = list2.data.items.map((item) => {
        return {
          checked: item.checked,
          text: getItemListValue(item.children)
        };
      });
      const data = __spreadProps(__spreadValues({}, list2.data), { items: checkboxes });
      return __spreadProps(__spreadValues({}, list2), { data });
    });
  };
  const listHasChanged = (prevItem, currItem) => {
    if (prevItem === null)
      return true;
    const currentIsCheckbox = currItem.checked !== null;
    const prevIsCheckbox = prevItem.checked !== null;
    return currentIsCheckbox !== prevIsCheckbox;
  };
  const getItemListValue = (itemList) => {
    const value = itemList.map((item) => {
      if (item.type !== "image") {
        return parseRemarkToEditorjs(item);
      }
      return "";
    }).join("");
    return value;
  };
  const getLastItem = (items) => items.length > 0 ? items[items.length - 1] : [];
  let itemData = [];
  const itemDataGroup = getLists(blocks);
  itemData = parseLists(itemDataGroup);
  return itemData;
};

// src/bloc-type-parsers/delimiter-type-parser.js
var parseDelimiterToMarkdown = function() {
  const delimiter2 = "---";
  return delimiter2.concat("\n");
};
var parseMarkdownToDelimiter = function() {
  let delimiterData = {};
  delimiterData = {
    data: {
      items: []
    },
    type: "delimiter"
  };
  return delimiterData;
};

// src/bloc-type-parsers/code-type-parser.js
var parseCodeToMarkdown = function(blocks) {
  return `\`\`\`
${blocks.code}
\`\`\`
`;
};
var parseMarkdownToCode = function(blocks) {
  const codeData = {
    data: {
      code: blocks.value
    },
    type: "code"
  };
  return codeData;
};

// src/bloc-type-parsers/quote-type-parser.js
var parseQuoteToMarkdown = function(blocks) {
  return `> ${blocks.text}
`;
};
var parseMarkdownToQuote = function(blocks) {
  let quoteData = {};
  blocks.children.forEach((items) => {
    items.children.forEach((listItem) => {
      if (listItem.type === "text") {
        quoteData = {
          data: {
            alignment: "left",
            caption: "",
            text: listItem.value
          },
          type: "quote"
        };
      }
    });
  });
  return quoteData;
};

// src/helpers/editorjs-md-importer.js
var MdImporter = class {
  /**
   * creates the Importer plugin
   * {editorData, api functions} - necessary to interact with the editor
   */
  constructor() {
  }
  /**
   * Function which parses markdown file to JSON which correspons the the editor structure
   * @return Parsed markdown in JSON format
   */
  import(content) {
    const parsedMarkdown = fromMarkdown(content, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()]
    });
    const blocks = parsedMarkdown.children.map((item) => {
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
    }).filter((value) => Object.keys(value).length !== 0).flat();
    return { time: Date(), blocks };
  }
};

// src/bloc-type-parsers/image-type-parser.js
var parseImageToMarkdown = function(blocks) {
  return `![${blocks.caption}](${blocks.url} "${blocks.caption}")`.concat("\n");
};

// src/bloc-type-parsers/checkbox-type-parser.js
var parseCheckboxToMarkdown = function(blocks) {
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

// src/helpers/editorjs-md-parser.js
var MdParser = class {
  constructor() {
  }
  parse(data) {
    const initialData = {};
    initialData.content = data.blocks;
    const parsedData = initialData.content.map((item) => {
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
};

// src/editor.js
import checklist from "@editorjs/checklist";
import delimiter from "@editorjs/delimiter";
import header from "@editorjs/header";
import list from "@editorjs/list";
var EditorJsMdConverter = class {
  constructor() {
    this.importer = new MdImporter();
    this.parser = new MdParser();
  }
  parse(data) {
    return this.parser.parse(data);
  }
  import(data) {
    return this.importer.import(data);
  }
};
var Checklist = checklist;
var Delimiter = delimiter;
var Header = header;
var List = list;
export {
  Checklist,
  Delimiter,
  EditorJsMdConverter,
  Header,
  List
};
