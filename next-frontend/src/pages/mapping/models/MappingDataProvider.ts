import Axios, {AxiosResponse} from "axios";
import {MagentoAttribute, KeystoneCatalogSourceAttribute} from "../../types/keystone";
import {config} from "../../config";
import {ImportResponse, CatalogSourceProduct} from "../../types/catalog-source"

export class MappingModel {
    private catalogSourceAttributeList: KeystoneCatalogSourceAttribute[] = [];

    private magentoList: MagentoAttribute[] = [];

    constructor(catalogSourceAttributeList: KeystoneCatalogSourceAttribute[], magentoList: MagentoAttribute[]) {
        this.catalogSourceAttributeList = catalogSourceAttributeList
        this.magentoList = magentoList
    }

    createAttributesImport = async (catalogSourceCode: string): Promise<ImportResponse | undefined> => {
        const fields = this.getFieldList()
        const response = await Axios.post(
            `${catalogSourceCode}/createImport`,
            {'mapping': fields}
        )

        return {
            filename: response.data.filename,
            fileurl: `${config.nodejsEndpoint}/${response.data.filename}`,
            rows: response.data.rows
        };
    }

    getProductDataImport = async (catalogSourceCode: string): Promise<CatalogSourceProduct[] | undefined> => {
        const fields = this.getFieldList()
        const response = await Axios.post(
            `${catalogSourceCode}/createImport`,
            {'mapping': fields}
        )

        if ("data" in response && "rows" in response?.data) {
            return response?.data?.rows as CatalogSourceProduct[]
        }
    }

    createKeystoneSeedImport = async (catalogSourceCode: string): Promise<AxiosResponse | undefined> => {
        try {
            const fields = this.getFieldList()
            return await Axios.post(
                `${catalogSourceCode}/createImport`,
                {'mapping':fields }
            );
        } catch (e) {
            console.log(e)
        }
    }

    getFieldList = () => {
        return this.catalogSourceAttributeList.map((attribute: KeystoneCatalogSourceAttribute) => ({
            catalogSourceFieldCode: attribute.code,
            magentoLinkedCode: this.getMagentoFieldCode(attribute.code)
        }))
    }

    getMagentoFieldCode = (catalogSourceFieldCode: string) => {
        const findAssignedAttribute = (attribute: MagentoAttribute, KeystoneCatalogSourceAttribute: string) => {
            return attribute.assignedTo.find(assign => assign.code === KeystoneCatalogSourceAttribute)
        }

        const field = this.magentoList.filter((attribute: MagentoAttribute) =>
            attribute.assignedTo!== null && findAssignedAttribute(attribute, catalogSourceFieldCode)
        )

        if (!field || field.length===0) {
            throw new Error(`attribute ${catalogSourceFieldCode} is not linked`);
        }

        return field[0].code
    }
}

