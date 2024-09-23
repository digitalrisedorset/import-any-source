import casual from 'casual';
import {DrdProduct} from "../types/drd";

const fs = require('node:fs/promises');
const path = require("path");

export class FakeImportCreator {
    createSeedImport = function (prefix: string, page: number = 1) {
        const getSku = (index: number, padding: number = 8) => {
            return `${prefix}${String(index).padStart(padding, '0')}`
        }
        const fakeProduct = (sku: string) => {
            const image = `${casual.word}.jpg`
            const row: DrdProduct = {
                id: casual.uuid,
                sku,
                name: casual.title,
                description: casual.words(),
                short_description: casual.words(),
                status: 'AVAILABLE',
                price: casual.integer(0, 1000),
                qty: casual.integer(0, 500),
                images: [{
                    name: image,
                    src: image,
                }]
            }

            return row
        }

        let rows = []
        for (let i = 1; i <= 1000; i++) {
            const sku = getSku(i * page)
            const product = fakeProduct(sku)
            rows.push(product)
        }

        return rows
        //await fs.writeFile(path.resolve(process.env.IMPORT_CSV_FOLDER, 'fake-products.ts'), 'export const products = ' + JSON.stringify(rows, null, 2));
    }
}
