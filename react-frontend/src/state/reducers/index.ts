import { combineReducers } from "redux";
import woocommerceAttributesReducer from "./woocommerceAttributesReducer";
import woocommerceMappingReducer from "./woocommerceMappingReducer"
import flashMessageReducer from "./flashMessageReducer";

const reducers = combineReducers({
    woocommerceAttributes: woocommerceAttributesReducer,
    woocommerceMapping: woocommerceMappingReducer,
    flashMessages: flashMessageReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>