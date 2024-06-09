"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvWriter = void 0;
const csvLibWriter = require('csv-writer');
const path = require('path');
class CsvWriter {
    constructor() {
        this.writer = null;
        this.writeHeader = (row) => {
            this.writer = csvLibWriter.createObjectCsvWriter({
                path: path.resolve(process.env.IMPORT_CSV_FOLDER, 'products.csv'),
                header: row,
            });
        };
        this.writeRecords = (rows) => __awaiter(this, void 0, void 0, function* () {
            let res = '';
            // @ts-ignore
            this.writer.writeRecords(rows).then(res = 'success');
            return res;
        });
    }
}
exports.CsvWriter = CsvWriter;
