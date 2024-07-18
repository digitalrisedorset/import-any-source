import { Dispatch } from 'redux'
import {PimAttributesLoadActionType } from "../action-types";
import {PimAttributeData } from "../../types/keystone";
import {useLazyQuery} from "@apollo/client";
import { ALL_PIM_PRODUCT_ATTRIBUTES_QUERY } from "../../graphql/keystone";
import {PimAttributesLoadActionList} from "../actions";

export const loadPimAttributes = () => {
    return async (dispatch: Dispatch<PimAttributesLoadActionList>) => {
        dispatch({
            type: PimAttributesLoadActionType.PIM_ATTRIBUTES_LOAD
        })

        try {
            const [getAttributeList] = useLazyQuery<PimAttributeData>(ALL_PIM_PRODUCT_ATTRIBUTES_QUERY, {
                variables: {
                    "where": {
                        "pimSystem": {
                            "equals": "woocommerce"
                        }
                    }
                }
            });

            getAttributeList().then((response) => {
                dispatch({
                    type: PimAttributesLoadActionType.PIM_ATTRIBUTES_LOAD_SUCCESS,
                    payload: response.data?.pimAttributes
                })
            });
        } catch (err: any) {
            dispatch({
                type: PimAttributesLoadActionType.PIM_ATTRIBUTES_LOAD_ERROR,
                payload: err.message
            })
        }
    }
}