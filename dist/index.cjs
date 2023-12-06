"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Checklist: function() {
        return Checklist;
    },
    Delimiter: function() {
        return Delimiter;
    },
    EditorJsMdConverter: function() {
        return EditorJsMdConverter;
    },
    Header: function() {
        return Header;
    },
    List: function() {
        return List;
    }
});
module.exports = __toCommonJS(src_exports);
// src/helpers/editorjs-md-importer.js
var import_mdast_util_from_markdown = require("mdast-util-from-markdown");
var import_micromark_extension_gfm = require("micromark-extension-gfm");
var import_mdast_util_gfm = require("mdast-util-gfm");
// src/helpers/helpers.js
var TurndownService = require("turndown").default;
var turndownService = new TurndownService();
var parseHtmlToMarkdownHelper = function(html) {
    return turndownService.turndown(html);
};
var parseRemarkToEditorjs = function(remarkBlock) {
    if (remarkBlock.children) {
        var text = remarkBlock.children.map(function(item) {
            return parseRemarkToEditorjs(item);
        }).join(" ");
        var extra = {};
        if (remarkBlock.type === "link") {
            extra = {
                url: remarkBlock.url
            };
        }
        return wrapTextType(remarkBlock.type, text, extra);
    }
    if (remarkBlock.type === "text") {
        return remarkBlock.value;
    }
};
var wrapTextType = function(type, text, extra) {
    if (type === "strong") {
        return "<b>".concat(text, "</b>");
    }
    if (type === "emphasis") {
        return "<i>".concat(text, "</i>");
    }
    if (type === "link") {
        return '<a href="'.concat(extra.url, '">').concat(text, "</a>");
    }
    return text;
};
// src/bloc-type-parsers/header-type-parser.js
var parseHeaderToMarkdown = function parseHeaderToMarkdown(blocks) {
    var text = parseHtmlToMarkdownHelper(blocks.text);
    switch(blocks.level){
        case 1:
            return "# ".concat(text, "\n");
        case 2:
            return "## ".concat(text, "\n");
        case 3:
            return "### ".concat(text, "\n");
        case 4:
            return "#### ".concat(text, "\n");
        case 5:
            return "##### ".concat(text, "\n");
        case 6:
            return "###### ".concat(text, "\n");
        default:
            break;
    }
};
var parseMarkdownToHeader = function parseMarkdownToHeader(blocks) {
    var text = blocks.children.map(function(item) {
        return parseRemarkToEditorjs(item);
    }).join(" ");
    return {
        data: {
            level: blocks.depth,
            text: text
        },
        type: "header"
    };
};
// src/bloc-type-parsers/paragraph-type-parser.js
var parseParagraphToMarkdown = function parseParagraphToMarkdown(blocks) {
    var text = parseHtmlToMarkdownHelper(blocks.text);
    return "".concat(text, "\n");
};
var parseMarkdownToParagraph = function parseMarkdownToParagraph(blocks) {
    var text = blocks.children.map(function(item) {
        if (item.type !== "image") {
            return parseRemarkToEditorjs(item);
        }
    }).join(" ");
    return {
        data: {
            text: text
        },
        type: "paragraph"
    };
};
// src/bloc-type-parsers/list-type-parser.js
var parseListToMarkdown = function parseListToMarkdown(blocks) {
    var items = {};
    switch(blocks.style){
        case "unordered":
            items = blocks.items.map(function(item) {
                var itemMd = parseHtmlToMarkdownHelper(item);
                return "- ".concat(itemMd);
            }).join("\n");
            return items;
        case "ordered":
            items = blocks.items.map(function(item, index) {
                var itemMd = parseHtmlToMarkdownHelper(item);
                return "".concat(index + 1, ". ").concat(itemMd);
            }).join("\n");
            return items;
        default:
            break;
    }
};
var parseMarkdownToList = function parseMarkdownToList(blocks) {
    var replace = function(array, index, value) {
        var ret = array.slice(0);
        ret[index] = value;
        return ret;
    };
    var getNewGroup = function(actualItem, isCheckList) {
        var group = {
            data: {
                items: [
                    actualItem
                ]
            },
            type: isCheckList ? "checklist" : "list"
        };
        if (!isCheckList) {
            group.data.style = blocks.ordered ? "ordered" : "unordered";
        }
        return group;
    };
    var getUpdatedBlock = function(prevGroup, actualItem) {
        var updatedData = _object_spread_props(_object_spread({}, prevGroup.data), {
            items: _to_consumable_array(prevGroup.data.items).concat([
                actualItem
            ])
        });
        var updatedCurrent = _object_spread_props(_object_spread({}, prevGroup), {
            data: updatedData
        });
        return updatedCurrent;
    };
    var getLists = function(blocks2) {
        return blocks2.children.reduce(function(prev, actualItem) {
            var prevGroup = getLastItem(prev);
            var prevIndex = prev.length > 0 ? prev.length - 1 : 0;
            var _prev_length;
            var prevLength = (_prev_length = prev === null || prev === void 0 ? void 0 : prev.length) !== null && _prev_length !== void 0 ? _prev_length : 0;
            var prevItem = null;
            if (prevLength > 0) {
                prevItem = getLastItem(prev[prevIndex].data.items);
            }
            var hasChanged = listHasChanged(prevItem, actualItem);
            var isCheckList = actualItem.checked !== null;
            if (hasChanged) {
                var group = getNewGroup(actualItem, isCheckList);
                return _to_consumable_array(prev).concat([
                    group
                ]);
            }
            var updatedCurrent = getUpdatedBlock(prevGroup, actualItem);
            return replace(prev, prevIndex, updatedCurrent);
        }, []);
    };
    var parseLists = function(itemDataGroup2) {
        return itemDataGroup2.map(function(list2) {
            if (list2.type === "list") {
                var items = list2.data.items.map(function(item) {
                    return getItemListValue(item.children);
                });
                var data2 = _object_spread_props(_object_spread({}, list2.data), {
                    items: items
                });
                return _object_spread_props(_object_spread({}, list2), {
                    data: data2
                });
            }
            var checkboxes = list2.data.items.map(function(item) {
                return {
                    checked: item.checked,
                    text: getItemListValue(item.children)
                };
            });
            var data = _object_spread_props(_object_spread({}, list2.data), {
                items: checkboxes
            });
            return _object_spread_props(_object_spread({}, list2), {
                data: data
            });
        });
    };
    var listHasChanged = function(prevItem, currItem) {
        if (prevItem === null) return true;
        var currentIsCheckbox = currItem.checked !== null;
        var prevIsCheckbox = prevItem.checked !== null;
        return currentIsCheckbox !== prevIsCheckbox;
    };
    var getItemListValue = function(itemList) {
        var value = itemList.map(function(item) {
            if (item.type !== "image") {
                return parseRemarkToEditorjs(item);
            }
            return "";
        }).join("");
        return value;
    };
    var getLastItem = function(items) {
        return items.length > 0 ? items[items.length - 1] : [];
    };
    var itemData = [];
    var itemDataGroup = getLists(blocks);
    itemData = parseLists(itemDataGroup);
    return itemData;
};
// src/bloc-type-parsers/delimiter-type-parser.js
var parseDelimiterToMarkdown = function parseDelimiterToMarkdown() {
    var delimiter2 = "---";
    return delimiter2.concat("\n");
};
var parseMarkdownToDelimiter = function parseMarkdownToDelimiter() {
    var delimiterData = {};
    delimiterData = {
        data: {
            items: []
        },
        type: "delimiter"
    };
    return delimiterData;
};
// src/bloc-type-parsers/code-type-parser.js
var parseCodeToMarkdown = function parseCodeToMarkdown(blocks) {
    return "```\n".concat(blocks.code, "\n```\n");
};
var parseMarkdownToCode = function parseMarkdownToCode(blocks) {
    var codeData = {
        data: {
            code: blocks.value
        },
        type: "code"
    };
    return codeData;
};
// src/bloc-type-parsers/quote-type-parser.js
var parseQuoteToMarkdown = function parseQuoteToMarkdown(blocks) {
    return "> ".concat(blocks.text, "\n");
};
var parseMarkdownToQuote = function parseMarkdownToQuote(blocks) {
    var quoteData = {};
    blocks.children.forEach(function(items) {
        items.children.forEach(function(listItem) {
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
var MdImporter = /*#__PURE__*/ function() {
    function MdImporter() {
        _class_call_check(this, MdImporter);
    }
    _create_class(MdImporter, [
        {
            /**
   * Function which parses markdown file to JSON which correspons the the editor structure
   * @return Parsed markdown in JSON format
   */ key: "import",
            value: function _import(content) {
                var parsedMarkdown = (0, import_mdast_util_from_markdown.fromMarkdown)(content, {
                    extensions: [
                        (0, import_micromark_extension_gfm.gfm)()
                    ],
                    mdastExtensions: [
                        (0, import_mdast_util_gfm.gfmFromMarkdown)()
                    ]
                });
                var blocks = parsedMarkdown.children.map(function(item) {
                    switch(item.type){
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
                }).filter(function(value) {
                    return Object.keys(value).length !== 0;
                }).flat();
                return {
                    time: Date(),
                    blocks: blocks
                };
            }
        }
    ]);
    return MdImporter;
}();
// src/bloc-type-parsers/image-type-parser.js
var parseImageToMarkdown = function parseImageToMarkdown(blocks) {
    return "![".concat(blocks.caption, "](").concat(blocks.url, ' "').concat(blocks.caption, '")').concat("\n");
};
// src/bloc-type-parsers/checkbox-type-parser.js
var parseCheckboxToMarkdown = function parseCheckboxToMarkdown(blocks) {
    var items = {};
    items = blocks.items.map(function(item) {
        var text = parseHtmlToMarkdownHelper(item.text);
        if (item.checked === true) {
            return "- [x] ".concat(text);
        }
        return "- [ ] ".concat(text);
    });
    return items.join("\n");
};
// src/helpers/editorjs-md-parser.js
var MdParser = /*#__PURE__*/ function() {
    function MdParser() {
        _class_call_check(this, MdParser);
    }
    _create_class(MdParser, [
        {
            key: "parse",
            value: function parse(data) {
                var initialData = {};
                initialData.content = data.blocks;
                var parsedData = initialData.content.map(function(item) {
                    switch(item.type){
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
    ]);
    return MdParser;
}();
// src/editor.js
var import_checklist = __toESM(require("@editorjs/checklist"), 1);
var import_delimiter = __toESM(require("@editorjs/delimiter"), 1);
var import_header = __toESM(require("@editorjs/header"), 1);
var import_list = __toESM(require("@editorjs/list"), 1);
var EditorJsMdConverter = /*#__PURE__*/ function() {
    function EditorJsMdConverter() {
        _class_call_check(this, EditorJsMdConverter);
        this.importer = new MdImporter();
        this.parser = new MdParser();
    }
    _create_class(EditorJsMdConverter, [
        {
            key: "parse",
            value: function parse(data) {
                return this.parser.parse(data);
            }
        },
        {
            key: "import",
            value: function _import(data) {
                return this.importer.import(data);
            }
        }
    ]);
    return EditorJsMdConverter;
}();
var Checklist = import_checklist.default;
var Delimiter = import_delimiter.default;
var Header = import_header.default;
var List = import_list.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Checklist: Checklist,
    Delimiter: Delimiter,
    EditorJsMdConverter: EditorJsMdConverter,
    Header: Header,
    List: List
});
