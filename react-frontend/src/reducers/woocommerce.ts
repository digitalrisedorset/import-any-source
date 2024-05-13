import { WoocommerceAttribute, WoocommerceActionTypes, WoocommerceAction } from "../actions";

export const woocommerceReducer = (state: WoocommerceAttribute[] = [], action: WoocommerceAction): WoocommerceAttribute[] => {
    switch (action.type) {
        case WoocommerceActionTypes.fetchWoocommerceAttributes:
            return action.payload;
        case WoocommerceActionTypes.deleteWoocommerceAttribute:
            return state.filter((todo: WoocommerceAttribute) => todo.id !== action.payload);
        default:
            return state;
    }
}