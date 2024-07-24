import path from "path";
import { config } from "../../config";
import { readFileSync } from 'fs';
import {z} from "zod";
import {SearchFilter} from '../../types/general'
import {PlantProduct} from "../../types/plant";
import { XmlParser } from '../xml-parser'

const PlantProductValidator = z.object({
    COMMON: z.string(),
    BOTANICAL: z.string(),
    ZONE: z.any(),
    LIGHT: z.string(),
    PRICE: z.string(),
    AVAILABILITY: z.number(),
})

const FeedContent = z.object({
    PLANT: z.array(PlantProductValidator)
})

export class PlantFileHandler {
    getAttributes = async () => {
        const data = await this.getProduct()

        return data.pop()
    }

    getProduct = async (filter?: SearchFilter) => {
        const data = this.readFeed()

        if (!("CATALOG" in data)) {
            throw new Error('the feed was empty');
        }

        const zodResult = FeedContent.parse(data.CATALOG);
        return zodResult.PLANT
    }

    getImportFile = () => {
        return path.resolve(config.feedSystem.feedFolder, 'plant_import.xml')
    }

    readFeed = (): any => {
        const xmlParser = new XmlParser()
        const xmlFile = readFileSync(this.getImportFile(), { encoding: 'utf8', flag: 'r' })
        return xmlParser.read(xmlFile)
    }
}