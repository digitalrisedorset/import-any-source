import Axios from "axios";
import {WocommerceApiAttributeResponse} from '../types/woocommerce'

export function RemoteWoocommerceAttributeProvider() {
    const loadAttributes = async function(): Promise<any | void> {
        try {
            const ourRequest = Axios.CancelToken.source()
            const response: WocommerceApiAttributeResponse = await Axios.get('/getWoocommerceAttributeList', { cancelToken: ourRequest.token });
            const data = response.data.map(attribute => ({
                code: attribute.code,
                name: attribute.name,
                type: (attribute.type==='options')?'select':'text',
                required: false,
                ignored: getIgnoredStatus(attribute.code)
            }));

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