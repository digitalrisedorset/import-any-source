const woocommerceDataMapper = require('./woocommerce/data-mapper')
const csvWriter = require('./csv-writer')
const magentoData = require('./magento-data')

let ImportCreator = function() {
    this.woocommerceDataMapper = new woocommerceDataMapper()
    this.csvWriter = new csvWriter()
    this.magentoData = new magentoData()
}

ImportCreator.prototype.createCsvImport = async function(data, mappingFields) {
    this.woocommerceDataMapper.setMappingFields(mappingFields)

    let record = data[0];
    let row = this.magentoData.getInitialHeaderData()

    Object.keys(record).forEach((key, index) => {
        const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
        if (magentoFieldCode) row.push({'id':magentoFieldCode, 'title': magentoFieldCode});
    });
    this.csvWriter.writeHeader(row)

    const rows = data.map(record => {
        const row = this.magentoData.getInitialData()
        Object.keys(record).forEach((key, index) => {
            const magentoFieldCode = this.woocommerceDataMapper.getMagentoField(key);
            if (magentoFieldCode) {
                row[magentoFieldCode] = this.woocommerceDataMapper.getMagentoValue(record[key], magentoFieldCode)
            }
        })
        return row
    })
    
    const res = await this.csvWriter.writeRecords(rows)

    return res
}

module.exports = ImportCreator;