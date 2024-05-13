import axios from 'axios'
import {Dispatch} from "redux";
import { WoocommerceActionTypes } from "./types";

// export enum WoocommerceActionTypes {
//     woocommerceAttributesLoad
// }

const todoUrl = 'https://jsonplaceholder.typicode.com/todos'

export interface FetchWoocommerceAttributesAction {
    type: WoocommerceActionTypes.fetchWoocommerceAttributes,
    payload: WoocommerceAttribute[]
}

export interface DeleteWoocommerceAttributeAction {
    type: WoocommerceActionTypes.deleteWoocommerceAttribute;
    payload: number;
}

export interface WoocommerceAttribute {
    id: number
    userId: number;
    title: string;
    completed: boolean
}

export const fetchWoocommerceAttributes = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<WoocommerceAttribute[]>(todoUrl)

        dispatch<FetchWoocommerceAttributesAction>({
            type: WoocommerceActionTypes.fetchWoocommerceAttributes,
            payload: response.data
        })
    }
}

export const deleteWoocommerceAttribute = (id: number): DeleteWoocommerceAttributeAction => {
    return {
        type: WoocommerceActionTypes.deleteWoocommerceAttribute,
        payload: id
    }
}