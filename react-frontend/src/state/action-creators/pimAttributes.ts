import {Dispatch} from "redux";
import {SetPimAttributeActionList} from "../actions";
import {PimAttributesActionType} from "../action-types";

export const setPimAttributesImported = (name: string, pimAttributes: number, magentoMapping?: number, remainingMapping?: number) => {
    return async (dispatch: Dispatch<SetPimAttributeActionList>) => {
        dispatch({
            type: PimAttributesActionType.SET_PIM_ATTRIBUTES_IMPORT,
            pimImportState: {
                name,
                active: true,
                pimAttributes,
                magentoMapping,
                remainingMapping
            }
        })
    }
}

export const setActivePimSystem = (pimSystemCode: string) => {
    return async (dispatch: Dispatch<SetPimAttributeActionList>) => {
        dispatch({
            type: PimAttributesActionType.SET_PIM_ATTRIBUTES_ACTIVE,
            pimSystemCode
        })
    }
}