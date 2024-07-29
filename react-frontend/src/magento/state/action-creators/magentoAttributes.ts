import {Dispatch} from "redux";
import {SetMagentoAttributeActionList} from "../../../state/actions";
import {MagentoAttributesActionType} from "../../../state/action-types";

export const setMagentoAttributesImported = (magentoAttributes: number) => {
    return async (dispatch: Dispatch<SetMagentoAttributeActionList>) => {
        dispatch({
            type: MagentoAttributesActionType.SET_MAGENTO_ATTRIBUTES_IMPORT,
            magentoAttributes
        })
    }
}