import path from "path";
import { config } from "../../config";
import { readFileSync } from 'fs';
import { SearchFilter } from '../../types/general'
import { z } from "zod";
import { BookProduct } from "../../types/book";
import { XmlParser } from '../xml-parser'

interface FeedResult {
    book: BookProduct[]
}

const BookProductValidator = z.object({
    sku: z.string(),
    title: z.string(),
    genre: z.string(),
    description: z.string(),
    price: z.number(),
    publish_date: z.string(),
    author: z.string(),
})

const FeedContent = z.object({
    book: z.array(BookProductValidator),
});

export class BookFileHandler {

    getAttributes = async () => {
        const data = await this.getProduct()

        return await data.book.pop()
    }

    getProduct = async (filter?: SearchFilter): Promise<FeedResult> => {
        const data = this.readFeed()

        if (!("catalog" in data)) {
            throw new Error('the feed was empty');
        }

        return await FeedContent.parse(data.catalog);
    }

    getImportFile = () => {
        return path.resolve(config.feedSystem.feedFolder, 'book_import.xml')
    }

    readFeed = (): any => {
        const xmlParser = new XmlParser()
        const xmlFile = readFileSync(this.getImportFile(), { encoding: 'utf8', flag: 'r' })
        return xmlParser.read(xmlFile)
    }
}