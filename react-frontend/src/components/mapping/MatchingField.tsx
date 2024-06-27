import { Attribute } from "./Attribute";
import CartStyles from "../styles/CartStyles";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {MatchingAttributeData} from "../../types/keystone";
import { useActions } from "../../hooks/useActions";

export function MatchingField(): JSX.Element {
    const { addFlashMessage } = useActions()
    const { woocommerceAttribute, magentoMatchAttributes } = useTypedSelector((state) => state.woocommerceMapping)

    addFlashMessage(`The system has found ${magentoMatchAttributes.length} possible matching magento attributes`)

    return (
        <CartStyles>
            <h2>Matching Attributes</h2>
            {(woocommerceAttribute && magentoMatchAttributes &&
                magentoMatchAttributes.map((attribute: MatchingAttributeData) => (
                    <Attribute key={attribute.value} attribute={attribute} initialAttribute={woocommerceAttribute}/>
                ))
            )}
        </CartStyles>
    )
}