const csvLibWriter = require('csv-writer');
const path = require('path');

export class CsvWriter {
    writer = null;

    writeHeader = (row: any) => {
        this.writer = csvLibWriter.createObjectCsvWriter({
            path: path.resolve(process.env.IMPORT_CSV_FOLDER, 'products.csv'),
            header: row,
        });
    }

    writeRecords = async (rows: any) => {
        let res = ''

        // @ts-ignore
        this.writer.writeRecords(rows).then(
            res = 'success'
        )

        return res;
    }
}