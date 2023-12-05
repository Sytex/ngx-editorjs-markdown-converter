import {
  parseHtmlToMarkdownHelper,
  parseRemarkToEditorjs,
} from "../helpers/helpers";

export const parseListToMarkdown = function (blocks) {
  let items = {};
  switch (blocks.style) {
    case "unordered":
      items = blocks.items
        .map((item) => {
          const itemMd = parseHtmlToMarkdownHelper(item);
          return `- ${itemMd}`;
        })
        .join("\n");

      return items;
    case "ordered":
      items = blocks.items
        .map((item, index) => {
          const itemMd = parseHtmlToMarkdownHelper(item);
          return `${index + 1}. ${itemMd}`;
        })
        .join("\n");

      return items;
    default:
      break;
  }
};

export const parseMarkdownToList = function (blocks) {
  const replace = (array, index, value) => {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
  };

  const getNewGroup = (actualItem, isCheckList) => {
    const group = {
      data: {
        items: [actualItem],
      },
      type: isCheckList ? "checklist" : "list",
    };
    if (!isCheckList) {
      group.data.style = blocks.ordered ? "ordered" : "unordered";
    }
    return group;
  };

  const getUpdatedBlock = (prevGroup, actualItem) => {
    const updatedData = {
      ...prevGroup.data,
      items: [...prevGroup.data.items, actualItem],
    };
    const updatedCurrent = {
      ...prevGroup,
      data: updatedData,
    };
    return updatedCurrent;
  };

  const getLists = (blocks) => {
    return blocks.children.reduce((prev, actualItem) => {
      const prevGroup = getLastItem(prev);
      const prevIndex = prev.length > 0 ? prev.length - 1 : 0;
      const prevLength = prev?.length ?? 0;
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

  const parseLists = (itemDataGroup) => {
    return itemDataGroup.map((list) => {
      if (list.type === "list") {
        const items = list.data.items.map((item) => {
          return getItemListValue(item.children);
        });
        const data = { ...list.data, items: items };
        return { ...list, data: data };
      }
      const checkboxes = list.data.items.map((item) => {
        return {
          checked: item.checked,
          text: getItemListValue(item.children),
        };
      });
      const data = { ...list.data, items: checkboxes };
      return { ...list, data: data };
    });
  };

  const listHasChanged = (prevItem, currItem) => {
    if (prevItem === null) return true;
    const currentIsCheckbox = currItem.checked !== null;
    const prevIsCheckbox = prevItem.checked !== null;
    return currentIsCheckbox !== prevIsCheckbox;
  };

  const getItemListValue = (itemList) => {
    const value = itemList
      .map((item) => {
        if (item.type !== "image") {
          return parseRemarkToEditorjs(item);
        }
        return "";
      })
      .join("");

    return value;
  };

  const getLastItem = (items) =>
    items.length > 0 ? items[items.length - 1] : [];

  let itemData = [];
  const itemDataGroup = getLists(blocks);
  itemData = parseLists(itemDataGroup);
  return itemData;
};
