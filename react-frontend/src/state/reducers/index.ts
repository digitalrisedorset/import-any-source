import { combineReducers } from "redux";
import pimAttributesReducer from "./pimAttributesReducer";
import pimMappingReducer from "./pimMappingReducer"
import flashMessageReducer from "./flashMessageReducer";
import pimImportReducer from "./pimImportReducer";
import pimSystemReducer from "./pimSystemReducer";

const reducers = combineReducers({
    pimAttributes: pimAttributesReducer,
    pimImport: pimImportReducer,
    pimMapping: pimMappingReducer,
    flashMessages: flashMessageReducer,
    pimSystem: pimSystemReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>