import {Dispatch} from "redux";
import {SetMagentoAttributeActionList} from "../actions";
import {MagentoAttributesActionType} from "../action-types";

export const setMagentoAttributesImported = (magentoAttributes: number) => {
    return async (dispatch: Dispatch<SetMagentoAttributeActionList>) => {
        dispatch({
            type: MagentoAttributesActionType.SET_MAGENTO_ATTRIBUTES_IMPORT,
            magentoAttributes
        })
    }
}