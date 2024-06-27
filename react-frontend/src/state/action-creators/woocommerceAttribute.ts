import { Dispatch } from 'redux'
import {WoocommmerceAttributesLoadActionType } from "../action-types";
import {WoocommerceAttributesLoadActionList} from "../actions";
import {WoocommerceAttributeData } from "../../types/keystone";
import {useLazyQuery} from "@apollo/client";
import { ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY } from "../../graphql/keystone";

export const loadWoocommerceAttributes = () => {
    return async (dispatch: Dispatch<WoocommerceAttributesLoadActionList>) => {
        dispatch({
            type: WoocommmerceAttributesLoadActionType.WOOCOMMERCE_ATTRIBUTES_LOAD
        })

        try {
            const [getAttributeList] = useLazyQuery<WoocommerceAttributeData>(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
                variables: {}
            });

            getAttributeList().then((response) => {
                dispatch({
                    type: WoocommmerceAttributesLoadActionType.WOOCOMMERCE_ATTRIBUTES_LOAD_SUCCESS,
                    payload: response.data?.woocommerceAttributes
                })
            });
        } catch (err: any) {
            dispatch({
                type: WoocommmerceAttributesLoadActionType.WOOCOMMERCE_ATTRIBUTES_LOAD_ERROR,
                payload: err.message
            })
        }
    }
}