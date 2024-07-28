import { combineReducers } from "redux";
import pimMappingReducer from "./pimMappingReducer"
import flashMessageReducer from "./flashMessageReducer";
import configurationPreferenceReducer from "./configurationPreferenceReducer";
import pimAttributeReducer from "./pimAttributeReducer"
import magentoAttributeReducer from "./magentoAttributeReducer";
import userLoginReducer from "./userLoginReducer";

const reducers = combineReducers({
    pimMapping: pimMappingReducer,
    flashMessages: flashMessageReducer,
    configurationPreference: configurationPreferenceReducer,
    pimAttribute: pimAttributeReducer,
    magentoAttribute: magentoAttributeReducer,
    userLogin: userLoginReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>