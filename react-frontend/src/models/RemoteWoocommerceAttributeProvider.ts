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
                    required: false
                }))
            })
            ourRequest.cancel()
        } catch (e) {
            console.log(e)
        }
    }

    const hasAttributesToCreate = function () {
        return getAttributesToCreateCount()>0
    }

    const getAttributesToCreateCount = function () {
        if (state.attributesToCreate === undefined) {
            return false;
        }
        return state.attributesToCreate.length
    }

    const getAttributesToCreate = function () {
        return state.attributesToCreate
    }

    return {
        loadAttributes,
        hasAttributesToCreate,
        getAttributesToCreate,
        getAttributesToCreateCount
    }
}