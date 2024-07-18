import {SetPimSystemActionList} from '../actions'
import {PimSystemActionType} from '../action-types'

interface PimSystemState {
    pimSystemCode: string
}

const initialState = {
    pimSystemCode: localStorage.getItem('pimSystemCode') || ''
}

const reducer = (
    state: PimSystemState = initialState,
    action: SetPimSystemActionList
): PimSystemState => {
    switch (action.type) {
        case PimSystemActionType.SET_PIM_SYSTEM:
            localStorage.setItem('pimSystemCode', action.pimSystemCode)
            return { pimSystemCode: action.pimSystemCode }
        default:
            return state;
    }
}

export default reducer