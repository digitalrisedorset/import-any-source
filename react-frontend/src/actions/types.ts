import { FetchToDoAction, DeleteToDoAction } from "./todos";
import { FetchMagentoAttributesAction, DeleteMagentoAttributeAction } from "./magento";
import { FetchPimAttributesAction, DeletePimAttributeAction } from "./pim";

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

export enum PimActionTypes {
    fetchPimAttributes,
    deletePimAttribute
}

export type PimAction = FetchPimAttributesAction | DeletePimAttributeAction