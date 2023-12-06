/**
 * Markdown Import class
 */
declare class MdImporter {
    /**
     * Function which parses markdown file to JSON which correspons the the editor structure
     * @return Parsed markdown in JSON format
     */
    import(content: any): {
        time: string;
        blocks: any[];
    };
}

declare class MdParser {
    parse(data: any): any;
}

declare class EditorJsMdConverter {
    importer: MdImporter;
    parser: MdParser;
    parse(data: any): any;
    import(data: any): {
        time: string;
        blocks: any[];
    };
}
declare const Checklist: any;
declare const Delimiter: any;
declare const Header: any;
declare const List: any;

export { Checklist, Delimiter, EditorJsMdConverter, Header, List };
