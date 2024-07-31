import {PimImportProductState, PimImportStateData} from "../../../types/states";
import {SetPimProductctionList} from "../actions/pimProduct";
import {PimProductsActionType} from "../action-types/PimProductsAction";

const reducer = (
    state: PimImportProductState = {pimProducts: [], pimProductHeader: []},
    action: SetPimProductctionList
): PimImportProductState => {
    let newState
    switch (action.type) {
        case PimProductsActionType.SET_PIM_PRODUCT_LOADED:
            const firstRecord = action.pimProducts[0]
            newState = {pimProducts: action.pimProducts, pimProductHeader: Object.keys(firstRecord)}
            return newState
        default:
            return state;
    }
}

export default reducer