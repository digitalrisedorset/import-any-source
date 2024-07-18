import { Dispatch } from 'redux'
import {PimAttributesImportActionType } from "../action-types";
import {PimAttributeData } from "../../types/keystone";
import {useLazyQuery} from "@apollo/client";
import { ALL_PIM_PRODUCT_ATTRIBUTES_QUERY } from "../../graphql/keystone";
import {PimAttributesImportActionList} from "../actions";

export const importPimAttributes = () => {
    return async (dispatch: Dispatch<PimAttributesImportActionList>) => {
        dispatch({
            type: PimAttributesImportActionType.PIM_ATTRIBUTES_IMPORT
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
                    type: PimAttributesImportActionType.PIM_ATTRIBUTES_IMPORT_SUCCESS,
                    payload: response.data?.pimAttributes
                })
            });
        } catch (err: any) {
            dispatch({
                type: PimAttributesImportActionType.PIM_ATTRIBUTES_IMPORT_ERROR,
                payload: err.message
            })
        }
    }
}