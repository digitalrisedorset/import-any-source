import {useImmer} from "use-immer";
import Axios from "axios";
import {RemoteAttributesToCreate} from '../types/keystone'
import {WocommerceApiAttributeResponse} from '../types/woocommerce'

export function RemoteWoocommerceAttributeProvider() {
    const [state, setState] = useImmer({
        attributesToCreate: []
    })

    const loadAttributes = async function() {
        try {
            const ourRequest = Axios.CancelToken.source()
            const response: WocommerceApiAttributeResponse = await Axios.get('/getWoocommerceAttributeList', { cancelToken: ourRequest.token });
            setState((draft: RemoteAttributesToCreate) => {
                draft.attributesToCreate = response.data.map(attribute => ({
                    code: attribute.code,
                    name: attribute.name,
                    type: (attribute.type==='options')?'select':'text',
                    required: false,
                    ignored: getIgnoredStatus(attribute.code)
                }))
            })
            ourRequest.cancel()
        } catch (e) {
            console.log(e)
        }
    }

    const getIgnoredStatus = (attributeCode: string) => {
        const attributeToActivate = ['name', 'description', 'price', 'status', 'sku', 'visibility', 'quantity', 'sale', 'color', 'size']

        return attributeToActivate.filter((word: string) => attributeCode.includes(word)).length === 0
    }

    const hasAttributesToCreate = () => {
        return getAttributesToCreateCount()>0
    }

    const getAttributesToCreateCount = () => {
        if (state.attributesToCreate === undefined) {
            return false;
        }
        return state.attributesToCreate.length
    }

    const getAttributesToCreate = () => {
        return state.attributesToCreate
    }

    return {
        loadAttributes,
        hasAttributesToCreate,
        getAttributesToCreate,
        getAttributesToCreateCount
    }
}