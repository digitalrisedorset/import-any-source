import { Attribute } from "./Attribute";
import CartStyles from "../../styles/CartStyles";
import { WoocommerceAttributeData } from '../../../types/keystone'

interface WoocommerceAttributeProps {
    data: WoocommerceAttributeData | undefined
}

export function GetWoocommerceAttribute(props: WoocommerceAttributeProps): JSX.Element {
    return (
        <CartStyles>
            <h2>Woocommerce Attributes</h2>
            {props.data && props.data!.woocommerceAttributes.map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CartStyles>
    )
}