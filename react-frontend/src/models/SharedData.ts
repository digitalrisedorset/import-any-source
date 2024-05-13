import { useImmerReducer} from "use-immer"

class SharedDataModel {
    private initialState = {
        flashMessages: [],
        magento: {attributes:[]},
        magentoLoaded: false,
        woocommerce: {attributes: []},
        woocommerceLoaded: false,
        matching: {attributes:[]},
        matchingLoaded: false
    }

    private reducerData;

    constructor() {
        this.reducerData = useImmerReducer(this.ourReducer, this.initialState)
    }

    private ourReducer(draft: any, action: any) {
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

    get getState() {
        const [state, ourReducer] = this.reducerData
        return state;
    }

    get getReducer() {
        const [state, ourReducer] = this.reducerData
        return ourReducer;
    }
}