import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY } from "../../../graphql/keystone";
import {MappingIgnoredArea} from "../../styles/MappingScreen";
import {WoocommerceAttribute, WoocommerceAttributeData} from "../../../types/keystone";
import {IgnoredAttribute} from "./IgnoredAttribute";

export function GetIgnoredAttribute() {
    const { data, error, loading }: QueryResult<WoocommerceAttributeData | OperationVariables > = useQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    if (loading) return <>Loading...</>

    const getIgnoredAttributesAlphabeticallyOrdered = (attributes: WoocommerceAttribute[]): WoocommerceAttribute[] => {
        const list = attributes.filter((attribute: WoocommerceAttribute) => attribute.ignored)
        list.sort((a, b) => a.code.localeCompare(b.code))

        return list
    }

    return (
        <MappingIgnoredArea>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <h4>Ignored Attributes</h4>
            {data && getIgnoredAttributesAlphabeticallyOrdered(data?.woocommerceAttributes).map(
                (attribute: WoocommerceAttribute) => <IgnoredAttribute key={attribute.id} attribute={attribute}/>
            )}
        </MappingIgnoredArea>
    )
}