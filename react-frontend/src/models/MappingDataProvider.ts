import Axios, {AxiosResponse} from "axios";
import {MagentoAttribute, WoocommerceAttribute} from "../types/keystone";

export class MappingModel {
    private wocommerceList: WoocommerceAttribute[] = [];

    private magentoList: MagentoAttribute[] = [];

    constructor(wocommerceList: WoocommerceAttribute[], magentoList: MagentoAttribute[]) {
        this.wocommerceList = wocommerceList
        this.magentoList = magentoList
    }

    public async createAttributesImport(): Promise<AxiosResponse | undefined> {
        try {
            const fields = this.getFieldList()
            return await Axios.post(
                '/createWoocommerceImport',
                {'mapping': fields}
            )
        } catch (e) {
            console.log(e)
        }
    }

    public async createKeystoneSeedImport(): Promise<AxiosResponse | undefined> {
        try {
            const fields = this.getFieldList()
            return await Axios.post(
                '/createWoocommerceImport',
                {'mapping':fields }
            );
        } catch (e) {
            console.log(e)
        }
    }

    public getFieldList() {
        return this.wocommerceList.map(attribute => ({
            woocommerceFieldCode: attribute.code,
            magentoLinkedCode: this.getMagentoFieldCode(attribute.code)
        }))
    }

    public getMagentoFieldCode(woocommerceFieldCode: string) {
        const field = this.magentoList.filter(
            attribute => attribute.assignedTo?.code === woocommerceFieldCode
        );

        if (!field || field.length===0) {
            throw new Error(`attribute ${woocommerceFieldCode} is not linked`);
        }

        return field[0].code
    }
}

