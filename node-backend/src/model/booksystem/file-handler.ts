import path from "path";
import { config } from "../../config";
import { readFileSync } from 'fs';
import { XMLParser, XMLValidator } from 'fast-xml-parser';


export class PlantFileHandler {
    getAttributes = async () => {
        const data = this.getProduct()

        return await data[0]
    }

    getProduct = async (filter: any) => {
        const data = this.readFeed()

        return await data.catalog.book
    }

    getImportFile = () => {
        return path.resolve(config.feedSystem.feedFolder, 'book_import.xml')
    }

    readFeed = () => {
        const xmlFile = readFileSync(this.getImportFile(), { encoding: 'utf8', flag: 'r' })
        const result = XMLValidator.validate(xmlFile);
        if (result === true) {
            console.log(`XML file is valid`, result);
        }

        if (result.err) {
            console.log(`XML is invalid because of - ${result.err.msg}`, result);
        }

        const parser = new XMLParser();
        return parser.parse(xmlFile)
    }
}