import axios from 'axios'
import {Dispatch} from "redux";
import { PimActionTypes } from "./types";

// export enum PimActionTypes {
//     pimAttributesLoad
// }

const todoUrl = 'https://jsonplaceholder.typicode.com/todos'

export interface FetchPimAttributesAction {
    type: PimActionTypes.fetchPimAttributes,
    payload: PimAttribute[]
}

export interface DeletePimAttributeAction {
    type: PimActionTypes.deletePimAttribute;
    payload: number;
}

export interface PimAttribute {
    id: number
    userId: number;
    title: string;
    completed: boolean
}

export const fetchPimAttributes = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<PimAttribute[]>(todoUrl)

        dispatch<FetchPimAttributesAction>({
            type: PimActionTypes.fetchPimAttributes,
            payload: response.data
        })
    }
}

export const deletePimAttribute = (id: number): DeletePimAttributeAction => {
    return {
        type: PimActionTypes.deletePimAttribute,
        payload: id
    }
}