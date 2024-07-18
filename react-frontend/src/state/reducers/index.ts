import { combineReducers } from "redux";
import pimMappingReducer from "./pimMappingReducer"
import flashMessageReducer from "./flashMessageReducer";
import pimSystemReducer from "./pimSystemReducer";

const reducers = combineReducers({
    pimMapping: pimMappingReducer,
    flashMessages: flashMessageReducer,
    pimSystem: pimSystemReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>