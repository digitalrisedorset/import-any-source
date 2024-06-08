const fs = require('node:fs/promises');
const path = require("path");

let ImportCreator = function() {

}

ImportCreator.prototype.createSeedImport = async function(data) {
    const rows = data.map(record => {
        const row = {}
        row.name = record.name
        row.description = record.description
        row.status = (record.status==='publish')?'AVAILABLE':'UNAVAILABLE'
        row.price = parseInt(record.price * 100)
        row.photo = {
            filename: record.images[0]?.name,
            mimetype: 'image/jpeg',
            encoding: '7bit',
            secure_url: record.images[0]?.src,
        }
        return row
    })

    await fs.writeFile(path.resolve(process.env.IMPORT_CSV_FOLDER, 'keystone-products.ts'), 'export const products = ' + JSON.stringify(rows, null, 2));
}

module.exports = ImportCreator;