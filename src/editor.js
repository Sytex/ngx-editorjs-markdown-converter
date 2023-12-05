import MdImporter from "./helpers/editorjs-md-importer";
import MdParser from "./helpers/editorjs-md-parser";
import checklist from '@editorjs/checklist';
import delimiter from '@editorjs/delimiter';
import header from '@editorjs/header';
import list from '@editorjs/list';

export class EditorJsMdConverter {
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
}

export const Checklist = checklist;
export const Delimiter = delimiter;
export const Header = header;
export const List = list;
