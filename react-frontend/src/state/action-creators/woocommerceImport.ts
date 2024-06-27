import { Dispatch } from 'redux'
import {WoocommmerceAttributesImportActionType } from "../action-types";
import {WoocommerceAttributesImportActionList} from "../actions";
import {WoocommerceAttributeData } from "../../types/keystone";
import {useLazyQuery} from "@apollo/client";
import { ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY } from "../../graphql/keystone";

export const importWoocommerceAttributes = () => {
    return async (dispatch: Dispatch<WoocommerceAttributesImportActionList>) => {
        dispatch({
            type: WoocommmerceAttributesImportActionType.WOOCOMMERCE_ATTRIBUTES_IMPORT
        })

        try {
            const [getAttributeList] = useLazyQuery<WoocommerceAttributeData>(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
                variables: {}
            });

            getAttributeList().then((response) => {
                dispatch({
                    type: WoocommmerceAttributesImportActionType.WOOCOMMERCE_ATTRIBUTES_IMPORT_SUCCESS,
                    payload: response.data?.woocommerceAttributes
                })
            });
        } catch (err: any) {
            dispatch({
                type: WoocommmerceAttributesImportActionType.WOOCOMMERCE_ATTRIBUTES_IMPORT_ERROR,
                payload: err.message
            })
        }
    }
}