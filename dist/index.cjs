"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Checklist: () => Checklist,
  Delimiter: () => Delimiter,
  EditorJsMdConverter: () => EditorJsMdConverter,
  Header: () => Header,
  List: () => List
});
module.exports = __toCommonJS(src_exports);

// src/helpers/editorjs-md-importer.js
var import_mdast_util_from_markdown = require("mdast-util-from-markdown");
var import_micromark_extension_gfm = require("micromark-extension-gfm");
var import_mdast_util_gfm = require("mdast-util-gfm");

// src/helpers/helpers.js
var TurndownService = require("turndown").default;
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
    const parsedMarkdown = (0, import_mdast_util_from_markdown.fromMarkdown)(content, {
      extensions: [(0, import_micromark_extension_gfm.gfm)()],
      mdastExtensions: [(0, import_mdast_util_gfm.gfmFromMarkdown)()]
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
var import_checklist = __toESM(require("@editorjs/checklist"), 1);
var import_delimiter = __toESM(require("@editorjs/delimiter"), 1);
var import_header = __toESM(require("@editorjs/header"), 1);
var import_list = __toESM(require("@editorjs/list"), 1);
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
var Checklist = import_checklist.default;
var Delimiter = import_delimiter.default;
var Header = import_header.default;
var List = import_list.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checklist,
  Delimiter,
  EditorJsMdConverter,
  Header,
  List
});
