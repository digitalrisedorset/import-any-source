import {DrdProduct} from "../types/drd";

const fs = require('node:fs/promises');
const path = require("path");

enum ImageType {
    jpeg  = 'image/jpeg'
}

enum ImageEncoding {
    sevenbit  = '7bit'
}

interface KeystoneProductImage {
    filename: string,
    mimetype: ImageType,
    encoding: ImageEncoding,
    secure_url: string
}
interface KeystoneProduct {
    name: string
    description: string
    status: string
    price: number
    photo: KeystoneProductImage
}

export class KeystoneImportCreator {
    createSeedImport = async function(data: DrdProduct[]) {
        const rows = data.map(record => {
            const row: KeystoneProduct = {
                name: record.name,
                description: record.description,
                status: (record.status==='publish')?'AVAILABLE':'UNAVAILABLE',
                price: record.price * 100,
                photo: {
                    filename: record.images[0]?.name || '',
                    mimetype: ImageType.jpeg,
                    encoding: ImageEncoding.sevenbit,
                    secure_url: record.images[0]?.src || '',
                }
            }

            return row
        })

        //await fs.writeFile(path.resolve(process.env.IMPORT_CSV_FOLDER, 'keystone-products.ts'), 'export const products = ' + JSON.stringify(rows, null, 2));
    }
}
