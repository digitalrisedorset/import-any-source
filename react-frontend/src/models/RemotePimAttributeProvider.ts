import Axios from "axios";
import {RemotePimAttribute} from '../types/pim'
import {PimAttribute} from "../types/keystone";

interface PimApiAttributeResponse {
    data: RemotePimAttribute[]
}

export function RemotePimAttributeProvider() {
    const loadAttributes = async function(pimSystemCode: string): Promise<any | void> {
        try {
            const ourRequest = Axios.CancelToken.source()
            const response: PimApiAttributeResponse = await Axios.get(`${pimSystemCode}/attributeList`, { cancelToken: ourRequest.token });
            const data: PimAttribute[] = response.data.map(attribute => ({
                code: attribute.code,
                name: attribute.name,
                type: (attribute.type==='options')?'select':'text',
                required: false,
                ignored: getIgnoredStatus(attribute.code),
                pimSystem: pimSystemCode
            } as PimAttribute));

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