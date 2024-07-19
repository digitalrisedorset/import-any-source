import { combineReducers } from "redux";
import pimMappingReducer from "./pimMappingReducer"
import flashMessageReducer from "./flashMessageReducer";
import pimSystemReducer from "./pimSystemReducer";
import configurationPreferenceReducer from "./configurationPreferenceReducer";

const reducers = combineReducers({
    pimMapping: pimMappingReducer,
    flashMessages: flashMessageReducer,
    pimSystem: pimSystemReducer,
    configurationPreference: configurationPreferenceReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>