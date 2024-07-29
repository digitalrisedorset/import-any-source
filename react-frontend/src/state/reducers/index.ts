import { combineReducers } from "redux";
import pimMappingReducer from "../../mapping/state/reducers/pimMappingReducer"
import flashMessageReducer from "../../global/state/reducers/flashMessageReducer";
import configurationPreferenceReducer from "../../configuration/state/reducers/configurationPreferenceReducer";
import pimAttributeReducer from "../../pim/state/reducers/pimAttributeReducer"
import magentoAttributeReducer from "../../magento/state/reducers/magentoAttributeReducer";

const reducers = combineReducers({
    pimMapping: pimMappingReducer,
    flashMessages: flashMessageReducer,
    configurationPreference: configurationPreferenceReducer,
    pimAttribute: pimAttributeReducer,
    magentoAttribute: magentoAttributeReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>