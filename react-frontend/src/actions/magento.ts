import axios from 'axios'
import {Dispatch} from "redux";
import { MagentoActionTypes } from "./types";

// export enum MagentoActionTypes {
//     magentoAttributesLoad
// }

const todoUrl = 'https://jsonplaceholder.typicode.com/todos'

export interface FetchMagentoAttributesAction {
    type: MagentoActionTypes.fetchMagentoAttributes,
    payload: MagentoAttribute[]
}

export interface DeleteMagentoAttributeAction {
    type: MagentoActionTypes.deleteMagentoAttribute;
    payload: number;
}

export interface MagentoAttribute {
    id: number
    userId: number;
    title: string;
    completed: boolean
}

export const fetchMagentoAttributes = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<MagentoAttribute[]>(todoUrl)

        dispatch<FetchMagentoAttributesAction>({
            type: MagentoActionTypes.fetchMagentoAttributes,
            payload: response.data
        })
    }
}

export const deleteMagentoAttribute = (id: number): DeleteMagentoAttributeAction => {
    return {
        type: MagentoActionTypes.deleteMagentoAttribute,
        payload: id
    }
}