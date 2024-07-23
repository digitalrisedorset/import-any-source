import path from "path";
import { config } from "../../config";
import { readFileSync } from 'fs';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { SearchFilter } from '../../types/general'
import { z } from "zod";
import { BookProduct } from "../../types/book";

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

        return data.book.pop()
    }

    getProduct = async (filter?: SearchFilter): Promise<FeedResult> => {
        const data = this.readFeed()

        if (!("catalog" in data)) {
            throw new Error('the feed was empty');
        }

        return FeedContent.parse(data.catalog);
    }

    getImportFile = () => {
        return path.resolve(config.feedSystem.feedFolder, 'book_import.xml')
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