import { Attribute } from "./Attribute";
import CartStyles from "../../styles/CartStyles";
import {WoocommerceAttribute, WoocommerceAttributeProps} from '../../../types/keystone'
import {WoocommerceAttributeDescription} from "./WoocommerceAttributeDescription";

export function GetWoocommerceAttribute(props: WoocommerceAttributeProps) {
    const getActiveAttributes = (attributes: WoocommerceAttribute[]): WoocommerceAttribute[] => {
        return attributes.filter((attribute: WoocommerceAttribute) => !attribute.ignored)
    }

    return (
        <CartStyles>
            <WoocommerceAttributeDescription />
            {props.data && getActiveAttributes(props.data!.woocommerceAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CartStyles>
    )
}