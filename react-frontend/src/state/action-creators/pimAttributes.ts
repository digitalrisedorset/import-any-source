import {Dispatch} from "redux";
import {SetPimAttributeActionList} from "../actions";
import {PimAttributesActionType} from "../action-types";

export const setPimAttributesImported = (pimSystemCode: string, pimAttributes: number, ignoredAttributes: number) => {
    return async (dispatch: Dispatch<SetPimAttributeActionList>) => {
        dispatch({
            type: PimAttributesActionType.SET_PIM_ATTRIBUTES_IMPORT,
            pimImportState: {
                name: pimSystemCode,
                pimAttributes,
                ignoredAttributes
            }
        })
    }
}

export const addPimAttributeMapped = (pimSystemCode: string) => {
    return async (dispatch: Dispatch<SetPimAttributeActionList>) => {
        dispatch({
            type: PimAttributesActionType.SET_PIM_ATTRIBUTE_MAPPED,
            pimSystemCode
        })
    }
}

export const addPimAttributeIgnored = (pimSystemCode: string) => {
    return async (dispatch: Dispatch<SetPimAttributeActionList>) => {
        dispatch({
            type: PimAttributesActionType.SET_PIM_ATTRIBUTE_IGNORED,
            pimSystemCode
        })
    }
}

export const addPimAttributeActivated = (pimSystemCode: string) => {
    return async (dispatch: Dispatch<SetPimAttributeActionList>) => {
        dispatch({
            type: PimAttributesActionType.SET_PIM_ATTRIBUTE_ACTIVATED,
            pimSystemCode
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