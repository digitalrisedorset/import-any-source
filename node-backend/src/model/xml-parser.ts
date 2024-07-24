import { XMLParser, XMLValidator } from "fast-xml-parser";

export class XmlParser {
    options = {
        ignoreAttributes: false
    };

    read = (xmlFile: string): any => {
        const result = XMLValidator.validate(xmlFile);

        if (result === true) {
            const parser = new XMLParser();
            return parser.parse(xmlFile)
        } else {
            console.log(`XML is invalid`, result.err.msg);
            throw new Error('The xml file is invalid')
        }
    }
}