import {PimAttributesActionType} from "../../../state/action-types";
import {SetPimAttributeActionList} from "../../../state/actions";
import { PimImportStateData} from "../../../types/states"
import {PimSystemHandler} from "../../../configuration/models/PimSystem";

const buildInitialImportState = () => {
    const pimSystemHandler = new PimSystemHandler()
    const loadStoragePimData = localStorage.getItem('pimSystems')

    if (loadStoragePimData === null) {
        return {pimImportState: pimSystemHandler.getPimSystemInitialStates()}
    }

    const data = JSON.parse(loadStoragePimData)
    return data as PimImportStateData
}

const initialState = buildInitialImportState()

const reducer = (
    state: PimImportStateData = initialState,
    action: SetPimAttributeActionList
): PimImportStateData => {
    let newState
    switch (action.type) {
        case PimAttributesActionType.SET_PIM_ATTRIBUTES_IMPORT:
            newState = {
                pimImportState: state.pimImportState.map(
                    (pimImportState) => pimImportState.name === action.pimImportState.name ?
                        {...pimImportState,
                            pimAttributes: action.pimImportState.pimAttributes,
                            ignoredAttributes: action.pimImportState.ignoredAttributes
                        }
                        : pimImportState)
            }
            localStorage.setItem('pimSystems', JSON.stringify(newState))
            return newState
        case PimAttributesActionType.SET_PIM_ATTRIBUTES_ACTIVE:
            newState = {
                pimImportState: state.pimImportState.map(
                    (pimImportState) => pimImportState.name === action.pimSystemCode ? {...pimImportState, active: true}
                        : {...pimImportState, active: false})
            }
            localStorage.setItem('pimSystems', JSON.stringify(newState))
            return newState
        case PimAttributesActionType.SET_PIM_ATTRIBUTE_MAPPED:
            newState = {
                pimImportState: state.pimImportState.map(
                    (pimImportState) => pimImportState.name === action.pimSystemCode ? {
                        ...pimImportState,
                        magentoMapping: pimImportState.magentoMapping + 1
                    } : {...pimImportState})
            }
            localStorage.setItem('pimSystems', JSON.stringify(newState))
            return newState
        case PimAttributesActionType.SET_PIM_ATTRIBUTE_IGNORED:
            newState = {
                pimImportState: state.pimImportState.map(
                    (pimImportState) => pimImportState.name === action.pimSystemCode ? {
                        ...pimImportState,
                        ignoredAttributes: pimImportState.ignoredAttributes + 1
                    } : {...pimImportState})
            }
            localStorage.setItem('pimSystems', JSON.stringify(newState))
            return newState
        case PimAttributesActionType.SET_PIM_ATTRIBUTE_ACTIVATED:
            newState = {
                pimImportState: state.pimImportState.map(
                    (pimImportState) => pimImportState.name === action.pimSystemCode ? {
                        ...pimImportState,
                        ignoredAttributes: pimImportState.ignoredAttributes - 1
                    } : {...pimImportState})
            }
            localStorage.setItem('pimSystems', JSON.stringify(newState))
            return newState
        default:
            return state;
    }
}

export default reducer