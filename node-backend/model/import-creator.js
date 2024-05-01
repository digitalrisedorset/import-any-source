const woocommerceDataMapper = require('./woocommerce/data-mapper')
const csvWriter = require('./csv-writer')

let ImportCreator = function() {
    this.woocommerceDataMapper = new woocommerceDataMapper()
    this.csvWriter = new csvWriter()
}

ImportCreator.prototype.createCsvImport = async function(data, mappingFields) {
    this.woocommerceDataMapper.setMappingFields(mappingFields)

    let record = data[0];
    let row = []

    Object.keys(record).forEach((key, index) => {
        const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);;
        if (magentoFieldCode) row.push({'id':magentoFieldCode, 'title': magentoFieldCode});
    });
    this.csvWriter.writeHeader(row)

    const rows = data.map(record => {
        const row = []
        Object.keys(record).forEach((key, index) => {
            const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
            if (magentoFieldCode) { row[magentoFieldCode] = record[key] }
        })
        return row
    })
    rows.push(rows)
    const res = await this.csvWriter.writeRecords(rows)
}

module.exports = ImportCreator;