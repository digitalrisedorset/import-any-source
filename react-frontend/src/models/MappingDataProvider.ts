import Axios, {AxiosResponse} from "axios";
import {MagentoAttribute, PimAttribute} from "../types/keystone";
import {config} from "../config";
import {ImportResponse} from "../types/pim"

export class MappingModel {
    private pimAttributeList: PimAttribute[] = [];

    private magentoList: MagentoAttribute[] = [];

    constructor(pimAttributeList: PimAttribute[], magentoList: MagentoAttribute[]) {
        this.pimAttributeList = pimAttributeList
        this.magentoList = magentoList
    }

    public async createAttributesImport(pimSystemCode: string): Promise<ImportResponse | undefined> {
        const fields = this.getFieldList()
        const response = await Axios.post(
            `${pimSystemCode}/createImport`,
            {'mapping': fields}
        )

        return {
            filename: response.data.filename,
            fileurl: `${config.nodejsEndpoint}/${response.data.filename}`
        };
    }

    public async createKeystoneSeedImport(pimSystemCode: string): Promise<AxiosResponse | undefined> {
        try {
            const fields = this.getFieldList()
            return await Axios.post(
                `${pimSystemCode}/createImport`,
                {'mapping':fields }
            );
        } catch (e) {
            console.log(e)
        }
    }

    public getFieldList() {
        return this.pimAttributeList.map(attribute => ({
            pimFieldCode: attribute.code,
            magentoLinkedCode: this.getMagentoFieldCode(attribute.code)
        }))
    }

    public getMagentoFieldCode(pimFieldCode: string) {
        const field = this.magentoList.filter((attribute) =>
            attribute.assignedTo!== null && attribute.assignedTo[0]?.code === pimFieldCode
        )

        if (!field || field.length===0) {
            throw new Error(`attribute ${pimFieldCode} is not linked`);
        }

        return field[0].code
    }
}

