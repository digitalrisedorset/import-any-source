const csvLibWriter = require('csv-writer');
const path = require('path');
import {config} from '../config'

export class CsvWriter {
    writer = null;

    private filename = ''

    startUpdate = () => {
        this.setProductFilename('products-update')
    }

    startDelete = () => {
        this.setProductFilename('products-delete')
    }

    startImport = () => {
        this.setProductFilename('products')
    }

    setProductFilename = (prefix: string) => {
        //const date = new Date().toLocaleString().replace(/[^A-Z0-9]+/ig, "-");
        //this.filename = `${prefix}-${date}.csv`
        this.filename = `${prefix}.csv`
    }

    getDownloadableFileLink = () => {
        return `${config.import.csvFolder}/${this.filename}`
    }

    getFilePath = () => {
        return `${config.rootDir}${config.import.csvFolder}/${this.filename}`
    }

    writeHeader = (row: any) => {
        console.log(`${(new Date()).toLocaleString()}: write csv file at ${this.getFilePath()}`)
        this.writer = csvLibWriter.createObjectCsvWriter({
            path: path.resolve(this.getFilePath()),
            header: row,
        });
    }

    writeRecords = async (rows: any) => {
        if (this.writer === null) {
            throw new Error('write has not been initialised')
        }

        //@ts-ignore
        return this.writer.writeRecords(rows).then(() => {
            return this.getDownloadableFileLink()
        })
    }
}