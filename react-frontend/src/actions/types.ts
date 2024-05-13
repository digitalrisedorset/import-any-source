import { FetchToDoAction, DeleteToDoAction } from "./todos";
import { FetchMagentoAttributesAction, DeleteMagentoAttributeAction } from "./magento";
import { FetchWoocommerceAttributesAction, DeleteWoocommerceAttributeAction } from "./woocommerce";

export enum ActionTypes {
    fetchToDo,
    deleteToDo
}

export type Action = FetchToDoAction | DeleteToDoAction

export enum MagentoActionTypes {
    fetchMagentoAttributes,
    deleteMagentoAttribute
}

export type MagentoAction = FetchMagentoAttributesAction | DeleteMagentoAttributeAction

export enum WoocommerceActionTypes {
    fetchWoocommerceAttributes,
    deleteWoocommerceAttribute
}

export type WoocommerceAction = FetchWoocommerceAttributesAction | DeleteWoocommerceAttributeAction