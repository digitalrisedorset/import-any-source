import { Attribute } from "./Attribute";
import GridStyles from "../../styles/GridStyles";
import {WoocommerceAttribute} from '../../../types/keystone'
import {WoocommerceAttributeDescription} from "./WoocommerceAttributeDescription";
import {LoadingDotsIcon} from "../../../Loading";
import {useQuery} from "@apollo/client";
import {ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY} from "../../../graphql/keystone";

export function GetWoocommerceAttribute() {
    const { data, error, loading } = useQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });
    const getActiveAttributes = (attributes: WoocommerceAttribute[]): WoocommerceAttribute[] => {
        return attributes.filter((attribute: WoocommerceAttribute) => !attribute.ignored)
    }

    return (
        <GridStyles>
            <WoocommerceAttributeDescription />
            {error && <h3>{error.message}</h3>}
            {data?.woocommerceAttributes?.length===0 && <LoadingDotsIcon />}
            {!loading && data && getActiveAttributes(data?.woocommerceAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </GridStyles>
    )
}