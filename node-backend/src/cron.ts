require('dotenv').config({ path: require('find-config')('.env.development') })
import {Woocommerce} from "./model/woocommerce";
import {ImportCreator} from "./model/import-creator";

const cron = require('node-cron');

//Schedule the cron job to run every minute
// cron.schedule('* * * * *', () => {
//     checkProductUpdate()
// });

const checkProductUpdate = async () => {
    debugger
    try {
        console.log('checkProductUpdate')
        let wooClient = new Woocommerce()
        const list = await wooClient.getProductUpdate()
        console.log(`Found ${list.length} update`);
        const wooImporter = new ImportCreator()
        wooImporter.createCsvUpdateImport(list)
        console.log('Cron checking product update executed at:', new Date().toLocaleString());
    } catch (e) {
        console.log('update with error')
    }
}

checkProductUpdate().then(() => {
    console.log('update complete')
})