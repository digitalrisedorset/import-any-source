import { Attribute } from "./Attribute";
import CartStyles from "../../styles/CartStyles";
import {WoocommerceAttribute, WoocommerceAttributeData} from '../../../types/keystone'

interface WoocommerceAttributeProps {
    data: WoocommerceAttributeData | undefined
}

export function GetWoocommerceAttribute(props: WoocommerceAttributeProps): JSX.Element {
    const getActiveAttributes = (attributes: WoocommerceAttribute[]): WoocommerceAttribute[] => {
        return attributes.filter((attribute: WoocommerceAttribute) => !attribute.ignored)
    }

    return (
        <CartStyles>
            <h2>Woocommerce Attributes</h2>
            {props.data && getActiveAttributes(props.data!.woocommerceAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CartStyles>
    )
}