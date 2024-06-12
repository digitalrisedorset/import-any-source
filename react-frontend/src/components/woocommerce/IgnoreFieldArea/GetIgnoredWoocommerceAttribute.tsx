import { IgnoredAttribute } from "./IgnoredAttribute";
import CartStyles from "../../styles/CartStyles";
import { WoocommerceAttributeData } from '../../../types/keystone'

interface WoocommerceAttributeProps {
    data: WoocommerceAttributeData | undefined
}

export function GetIgnoredWoocommerceAttribute(props: WoocommerceAttributeProps): JSX.Element {
    return (
        <>
            <h4>Ignored Attributes</h4>
            {props.data && props.data!.woocommerceAttributes.map(
                (attribute) => <IgnoredAttribute key={attribute.id} attribute={attribute}/>
            )}
        </>
    )
}