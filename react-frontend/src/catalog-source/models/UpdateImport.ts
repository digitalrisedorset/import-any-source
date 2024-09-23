import Axios from "axios"
import {ImportUpdateResponse} from "../../types/catalog-source"
import {config} from "../../config";

export class UpdateModel {
    createUpdateImport = async (): Promise<ImportUpdateResponse | undefined> => {
        try {
            const response = await Axios.post('drd/createUpdate', {});

            return {
                filename: response.data.filename,
                fileurl: `${config.nodejsEndpoint}/${response.data.filename}`,
                numberItem: response.data?.update,
                rows: response.data?.rows
            } as ImportUpdateResponse;
        } catch (e) {
            console.log(e)
        }
    }

    updateProductImportStatus = async (sku: string) => {
        try {
            const response = await Axios.post('drd/setProductImported', {sku, import_status: 'imported'});
            if (response.data === 'success') {
                return true
            }
        } catch (e) {
            console.log(e)
        }
    }

    createDeleteImport = async () => {
        try {
            const response = await Axios.post('drd/createDelete', {});

            return {
                filename: response.data.filename,
                fileurl: `${config.nodejsEndpoint}/${response.data.filename}`,
                numberItem: response.data?.delete,
                rows: response.data?.rows
            } as ImportUpdateResponse;
        } catch (e) {
            console.log(e)
            return {
                filename: '',
                fileurl: ``,
                numberItem: 0
            } as ImportUpdateResponse;
        }
    }
}