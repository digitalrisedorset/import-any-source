const csvLibWriter = require('csv-writer');
const path = require('path');
import {config} from '../config'

export class CsvWriter {
    writer = null;

    writeHeader = (row: any) => {
        console.log(`${(new Date()).toLocaleString()}: write csv file at ${config.import.csv_folder}/products.csv`)
        this.writer = csvLibWriter.createObjectCsvWriter({
            path: path.resolve(config.import.csv_folder, 'products.csv'),
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