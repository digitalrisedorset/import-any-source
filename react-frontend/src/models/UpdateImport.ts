import Axios from "axios"
import {ImportUpdateResponse} from "../types/woocommerce"
import {config} from "../config";

export class UpdateModel {
    public async createUpdateImport(): Promise<ImportUpdateResponse | undefined> {
        try {
            const response = await Axios.post('/createWoocommerceUpdate', {});

            return {
                filename: response.data.filename,
                fileurl: `${config.nodejsEndpoint}/${response.data.filename}`,
                numberUpdate: response.data?.update
            };
        } catch (e) {
            console.log(e)
        }
    }
}