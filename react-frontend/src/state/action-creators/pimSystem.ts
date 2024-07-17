import {Dispatch} from "redux";
import {PimSystemActionType} from "../action-types";
import {SetPimSystemActionList} from "../actions";

export const setActivePimSystem = (pimSystemCode: string) => {
    return async (dispatch: Dispatch<SetPimSystemActionList>) => {
        dispatch({
            type: PimSystemActionType.SET_PIM_SYSTEM,
            pimSystemCode
        })
    }
}