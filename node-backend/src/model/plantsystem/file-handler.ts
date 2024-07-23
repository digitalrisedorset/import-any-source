import path from "path";
import { config } from "../../config";
import { readFileSync } from 'fs';
import {XMLParser, XMLValidator} from 'fast-xml-parser';
import {z} from "zod";
import {SearchFilter} from '../../types/general'
import {PlantProduct} from "../../types/plant";

interface FeedResult {
    book: PlantProduct[]
}

const PlantProductValidator = z.object({
    COMMON: z.string(),
    BOTANICAL: z.string(),
    ZONE: z.number(),
    LIGHT: z.string(),
    PRICE: z.string(),
    AVAILABILITY: z.string(),
})

const FeedContent = z.object({
    PLANT: z.array(PlantProductValidator)
})

export class PlantFileHandler {
    getAttributes = async () => {
        const data = await this.getProduct()

        return data.PLANT.pop()
    }

    getProduct = async (filter?: SearchFilter) => {
        const data = this.readFeed()

        if (!("CATALOG" in data)) {
            throw new Error('the feed was empty');
        }

        return FeedContent.parse(data.CATALOG);
    }

    getImportFile = () => {
        return path.resolve(config.feedSystem.feedFolder, 'plant_import.xml')
    }

    readFeed = (): unknown => {
        const xmlFile = readFileSync(this.getImportFile(), { encoding: 'utf8', flag: 'r' })
        const result = XMLValidator.validate(xmlFile);

        if (result === true) {
            console.log(`XML file is valid`, result);
        } else {
            console.log(`XML is invalid`, result.err.msg);
        }

        const parser = new XMLParser();
        return parser.parse(xmlFile)
    }
}