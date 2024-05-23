import { combineReducers } from "redux";
import woocommerceAttributesReducer from "./woocommerceAttributesReducer";
import woocommerceMappingReducer from "./woocommerceMappingReducer"
import flashMessageReducer from "./flashMessageReducer";
import woocommerceImportReducer from "./woocommerceImportReducer";

const reducers = combineReducers({
    woocommerceAttributes: woocommerceAttributesReducer,
    woocommerceImport: woocommerceImportReducer,
    woocommerceMapping: woocommerceMappingReducer,
    flashMessages: flashMessageReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>