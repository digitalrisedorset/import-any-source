const csvLibWriter = require('csv-writer');
const path = require('path');

let CsvWriter = function() {
    this.writer = null;
}

CsvWriter.prototype.writeHeader = function(row)
{
    this.writer = csvLibWriter.createObjectCsvWriter({
        path: path.resolve(process.env.IMPORT_CSV_FOLDER, 'products.csv'),
        header: row,
    });
}

CsvWriter.prototype.writeRecords = async function(rows)
{
      this.writer.writeRecords(rows).then(
        $res = 'success'
    )

    return $res;
}

module.exports = CsvWriter;