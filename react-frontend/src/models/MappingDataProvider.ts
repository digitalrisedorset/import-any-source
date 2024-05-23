import Axios from "axios";
import {MagentoAttribute, WoocommerceAttribute} from "../types/keystone";

export class MappingModel {
    private wocommerceList: WoocommerceAttribute[] = [];

    private magentoList: MagentoAttribute[] = [];

    constructor(wocommerceList: WoocommerceAttribute[], magentoList: MagentoAttribute[]) {
        this.wocommerceList = wocommerceList
        this.magentoList = magentoList
    }

    public async createAttributesImport() {
        try {
            const fields = this.getFieldList()
            const response = await Axios.post(
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
            attribute => attribute.assignedTo.code === woocommerceFieldCode
        );

        return field[0].code
    }
}

