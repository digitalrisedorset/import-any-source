import Axios from "axios"
import {ImportUpdateResponse} from "../types/pim"
import {config} from "../config";

export class UpdateModel {
    createUpdateImport = async (): Promise<ImportUpdateResponse | undefined> => {
        try {
            const response = await Axios.post('woo/createUpdate', {});

            return {
                filename: response.data.filename,
                fileurl: `${config.nodejsEndpoint}/${response.data.filename}`,
                numberItem: response.data?.update
            } as ImportUpdateResponse;
        } catch (e) {
            console.log(e)
        }
    }

    createDeleteImport = async () => {
        try {
            const response = await Axios.post('woo/createDelete', {});

            return {
                filename: response.data.filename,
                fileurl: `${config.nodejsEndpoint}/${response.data.filename}`,
                numberItem: response.data?.delete
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

    readDeleteNotification = async () => {
        try {
            const response = await Axios.post('/pimDeleteNotification', {});
            if (response.data.length>0) {
                return response.data;
            }
        } catch (e) {
            console.log(e)
        }
    }
}