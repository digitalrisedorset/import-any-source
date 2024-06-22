import Axios, {AxiosResponse} from "axios";

export class UpdateModel {
    public async createUpdateImport(): Promise<AxiosResponse | undefined> {
        try {
            const response = await Axios.post('/createWoocommerceUpdate', {});
            return response.data?.count
        } catch (e) {
            console.log(e)
        }
    }
}