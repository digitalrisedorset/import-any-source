import {MagentoAttributesActionType} from "../../../state/action-types";
import {SetMagentoAttributeActionList} from "../../../state/actions";
import {MagentoImportStateData} from "@/pages/types/states"

const buildInitialState = (): MagentoImportStateData => {
    const loadStorageMagentoData = localStorage.getItem('magentoAttributes')

    if (loadStorageMagentoData === null) {
        return {magentoAttributes: 0}
    }

    return {magentoAttributes: parseInt(loadStorageMagentoData)}
}

const initialState = buildInitialState()

const reducer = (
    state: MagentoImportStateData = initialState,
    action: SetMagentoAttributeActionList
): MagentoImportStateData => {
    switch (action.type) {
        case MagentoAttributesActionType.SET_MAGENTO_ATTRIBUTES_IMPORT:
            localStorage.setItem('magentoAttributes', action.magentoAttributes.toString())
            return { magentoAttributes: action.magentoAttributes }
        default:
            return state;
    }
}

export default reducer