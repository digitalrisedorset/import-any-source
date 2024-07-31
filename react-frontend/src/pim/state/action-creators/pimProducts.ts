import {Dispatch} from "redux";
import {SetPimProductctionList} from "../actions/pimProduct";
import {PimProductsActionType} from "../action-types/PimProductsAction";
import {RemotePimProduct} from "../../../types/pim";

export const setPimProductBatchLoaded = (pimProducts: RemotePimProduct[]) => {
    return async (dispatch: Dispatch<SetPimProductctionList>) => {
        dispatch({
            type: PimProductsActionType.SET_PIM_PRODUCT_LOADED,
            pimProducts
        })
    }
}