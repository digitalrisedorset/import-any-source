import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {
    IGNORED_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY
} from "../../../graphql/keystone";
import {MappingIgnoredArea} from "../../styles/MappingScreen";
import { WoocommerceAttributeData} from "../../../types/keystone";
import {GetIgnoredWoocommerceAttribute} from "./GetIgnoredWoocommerceAttribute";
import {IgnoredAttribute} from "./IgnoredAttribute";

export function GetIgnoredAttribute() {
    const { data, error, loading }: QueryResult<OperationVariables > = useQuery(IGNORED_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": true
                }
            }
        },
    });

    if (loading) return <>Loading...</>

    return (
        <MappingIgnoredArea>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <GetIgnoredWoocommerceAttribute data={data as WoocommerceAttributeData} />
        </MappingIgnoredArea>
    )
}