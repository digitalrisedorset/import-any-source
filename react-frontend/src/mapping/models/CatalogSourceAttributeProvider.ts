import Axios from "axios";
import {CatalogSourceAttribute} from '../../types/catalog-source'
import {KeystoneCatalogSourceAttribute} from "../../types/keystone";

interface CatalogSourceApiAttributeResponse {
    data: CatalogSourceAttribute[]
}

export function CatalogSourceAttributeProvider() {
    const loadAttributes = async function(catalogSourceCode: string): Promise<any | void> {
        try {
            const ourRequest = Axios.CancelToken.source()
            const response: CatalogSourceApiAttributeResponse = await Axios.get(`${catalogSourceCode}/attributeList`, { cancelToken: ourRequest.token });
            const data: CatalogSourceAttribute[] = response.data.map(attribute => ({
                code: attribute.code,
                name: attribute.name,
                type: (attribute.type==='options')?'select':'text',
                required: false,
                ignored: getIgnoredStatus(attribute.code),
                catalogSource: catalogSourceCode
            } as CatalogSourceAttribute));

            ourRequest.cancel()
            return data
        } catch (e) {
            console.log(e)
        }
    }

    const getIgnoredStatus = (attributeCode: string) => {
        const attributeToActivate = ['name', 'description', 'price', 'status', 'sku', 'visibility', 'quantity', 'sale', 'color', 'size']

        return attributeToActivate.filter((word: string) => attributeCode.includes(word)).length === 0
    }

    return {
        loadAttributes
    }
}