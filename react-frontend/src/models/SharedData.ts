import { useImmerReducer} from "use-immer"

export function SharedDataModel() {
    const initialState = {
        flashMessages: [],
        magento: {attributes:[]},
        magentoLoaded: false,
        woocommerce: {attributes: []},
        woocommerceLoaded: false,
        matching: {attributes:[]},
        matchingLoaded: false
    }

    function ourReducer(draft: any, action: any) {
        switch (action.type) {
            case "clearMessage":
                draft.flashMessages = []
                return;
            case "flashMessage":
                draft.flashMessages.push(action.value)
                draft.messageType = 'success';
                return
            case "errorMessage":
                draft.flashMessages.push(action.value)
                draft.messageType = 'error';
                return
            case "magentoAttributesLoad":
                draft.magento.attributes = action.value
                draft.magentoLoaded = true
                return
            case "woocommerceAttributesLoad":
                draft.woocommerce.attributes = action.value
                draft.woocommerceLoaded = true
                return
            case "matchingAttributesLoad":
                draft.matching.attributes = action.value.match
                draft.matching.initialAttribute = action.value.initialAttribute
                draft.matchingLoaded = true
                return
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    return {
        state,
        dispatch
    }
}