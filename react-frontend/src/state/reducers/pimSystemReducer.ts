import {SetPimSystemActionList} from '../actions'
import {PimSystemActionType} from '../action-types'

interface PimSystemState {
    pimSystemCode: string
}

const initialState = {
    pimSystemCode: ''
}

const reducer = (
    state: PimSystemState = initialState,
    action: SetPimSystemActionList
): PimSystemState => {
    switch (action.type) {
        case PimSystemActionType.SET_PIM_SYSTEM:
            return { pimSystemCode: action.pimSystemCode }
        default:
            return state;
    }
}

export default reducer