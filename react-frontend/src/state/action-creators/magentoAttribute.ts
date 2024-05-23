import { Dispatch } from 'redux'
import {MagentoAttributesLoadActionType, WoocommmerceAttributesLoadActionType} from "../action-types";
import {MagentoAttributesLoadActionList} from "../actions";
import {KeystoneMagentoAttributeData } from "../../types/keystone";
import {useLazyQuery} from "@apollo/client";
import {ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY} from "../../graphql/keystone";

export const loadMagentoAttributes = () => {
    return async (dispatch: Dispatch<MagentoAttributesLoadActionList>) => {
        dispatch({
            type: MagentoAttributesLoadActionType.MAGENTO_ATTRIBUTES_LOAD
        })

        try {
            const [getAttributeList, { loading, data }] = useLazyQuery<KeystoneMagentoAttributeData>(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
                variables: {}
            });

            getAttributeList().then((response) => {
                dispatch({
                    type: MagentoAttributesLoadActionType.MAGENTO_ATTRIBUTES_LOAD_SUCCESS,
                    payload: response.data?.magentoAttributes
                })
            });
        } catch (err: any) {
            dispatch({
                type: MagentoAttributesLoadActionType.MAGENTO_ATTRIBUTES_LOAD_ERROR,
                payload: err.message
            })
        }
    }
}