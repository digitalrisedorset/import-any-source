import { MagentoAttribute, MagentoActionTypes, MagentoAction } from "../actions";

export const magentoReducer = (state: MagentoAttribute[] = [], action: MagentoAction): MagentoAttribute[] => {
    switch (action.type) {
        case MagentoActionTypes.fetchMagentoAttributes:
            return action.payload;
        case MagentoActionTypes.deleteMagentoAttribute:
            return state.filter((todo: MagentoAttribute) => todo.id !== action.payload);
        default:
            return state;
    }
}