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
exports.ImportCreator = void 0;
const data_mapper_1 = require("./woocommerce/data-mapper");
const csv_writer_1 = require("./csv-writer");
const magento_data_1 = require("./magento-data");
class ImportCreator {
    constructor() {
        this.woocommerceDataMapper = new data_mapper_1.WoocommerceDataMapper();
        this.csvWriter = new csv_writer_1.CsvWriter();
        this.magentoData = new magento_data_1.MagentoData();
        this.getSkuRecord = function (record) {
            let sku = record['sku'];
            if (sku === '') {
                sku = record['name'].replace(/[/\\?%*:|"<>]/g, '-');
            }
            return sku;
        };
        this.createCsvImport = (data, mappingFields) => __awaiter(this, void 0, void 0, function* () {
            this.woocommerceDataMapper.setMappingFields(mappingFields);
            let record = data[0];
            let row = this.magentoData.getInitialHeaderData();
            Object.keys(record).forEach((key) => {
                const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
                if (magentoFieldCode)
                    row.push({ 'id': magentoFieldCode, 'title': magentoFieldCode });
            });
            this.csvWriter.writeHeader(row);
            const rows = data.map(record => {
                const row = this.magentoData.getInitialData();
                Object.keys(record).forEach((key) => {
                    // https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
                    const item = record[key];
                    const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
                    if (magentoFieldCode === 'sku') {
                        row[magentoFieldCode] = this.getSkuRecord(record);
                    }
                    else if (magentoFieldCode) {
                        row[magentoFieldCode] = this.woocommerceDataMapper.getMagentoValue(record, key, magentoFieldCode);
                    }
                });
                return row;
            });
            return yield this.csvWriter.writeRecords(rows);
        });
    }
}
exports.ImportCreator = ImportCreator;
