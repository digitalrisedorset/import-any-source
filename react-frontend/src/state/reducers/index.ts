import { combineReducers } from "redux";
import catalogSourceMappingReducer from "../../mapping/state/reducers/catalogSourceMappingReducer"
import flashMessageReducer from "../../global/state/reducers/flashMessageReducer";
import configurationPreferenceReducer from "../../configuration/state/reducers/configurationPreferenceReducer";
import catalogSourceAttributeReducer from "../../catalog-source/state/reducers/catalogSourceAttributeReducer"
import magentoAttributeReducer from "../../magento/state/reducers/magentoAttributeReducer";
import catalogSourceProductReducer from "../../catalog-source/state/reducers/catalogSourceProductReducer";

const reducers = combineReducers({
    catalogSourceMapping: catalogSourceMappingReducer,
    flashMessages: flashMessageReducer,
    configurationPreference: configurationPreferenceReducer,
    catalogSourceAttribute: catalogSourceAttributeReducer,
    magentoAttribute: magentoAttributeReducer,
    catalogSourceProduct: catalogSourceProductReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>