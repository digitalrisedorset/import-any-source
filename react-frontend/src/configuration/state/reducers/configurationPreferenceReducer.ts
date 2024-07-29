import {SetConfigActionList} from '../actions/configPreference'
import {ConfigActionType} from '../action-types/configAction'
import {AccessState} from "../../../types/states";

interface ConfigurationState {
    themeCode: string,
    accessEnabled: AccessState
}

const accessDisabled: AccessState = {
    canCreateProducts: false,
    canUpdateProducts: false,
    canDeleteProducts: false,
    canImportPIMAttribute: false,
    canImportMagentoAttribute: false,
    canMapAttribute: false,
    canImportProduct: false,
    canMonitorData: false,
    canSetupImport: false
}

const buildInitialConfigState = () => {
    const configuration = localStorage.getItem('configuration')

    if (configuration === null) {
        const themeCode = ''

        return {
            themeCode,
            accessEnabled: accessDisabled
        }
    } else {
        return JSON.parse(configuration) as ConfigurationState
    }
}

const initialState = buildInitialConfigState()

const reducer = (
    state: ConfigurationState = initialState,
    action: SetConfigActionList
): ConfigurationState => {
    let newState
    switch (action.type) {
        case ConfigActionType.SET_THEME_PREFERENCE:
            newState = {...state, themeCode: action.themeCode }
            localStorage.setItem('configuration', JSON.stringify(newState))
            return newState
        case ConfigActionType.SET_ACCESS_ENABLED:
            newState = {...state, accessEnabled: action.accessEnabled }
            localStorage.setItem('configuration', JSON.stringify(newState))
            return newState
        case ConfigActionType.SET_ACCESS_DISABLED:
            newState = {...state, accessEnabled: accessDisabled }
            localStorage.setItem('configuration', JSON.stringify(newState))
            return newState
        default:
            return state;
    }
}

export default reducer