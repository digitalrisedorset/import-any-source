import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY} from "../../../graphql/keystone";
import {
    WoocommerceAttribute,
    WoocommerceQueryResult
} from "../../../types/keystone";

export function WoocommerceAttributeDescription() {
    const { data }: QueryResult<WoocommerceQueryResult | OperationVariables> = useQuery(ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null
            }
        }
    });

    const getCountAttributesToMap = (attributes: WoocommerceAttribute[]) => {
        if (attributes.length === 0) {
            return '(all the attributes are mapped)'
        } else {
            return `(${attributes.length} attributes are still to find mapping)`
        }
    }

    return (
        <h2>Woocommerce Attributes {data && getCountAttributesToMap(data?.woocommerceAttributes)}</h2>
    )
}