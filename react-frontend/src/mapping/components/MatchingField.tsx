import { Attribute } from "./Attribute";
import CardStyles from "../../configuration/styles/CardStyles";
import { useTypedSelector } from "../../global/hooks/useTypedSelector";
import {MatchingAttributeData} from "../../types/keystone";
import { useActions } from "../../global/hooks/useActions";

export const MatchingField = () => {
    const { addFlashMessage } = useActions()
    const { pimAttribute, magentoMatchAttributes } = useTypedSelector((state) => state.pimMapping)

    addFlashMessage(`The system has found ${magentoMatchAttributes.length} possible matching magento attributes`)

    return (
        <CardStyles>
            <h2>Matching Attributes</h2>
            {(pimAttribute && magentoMatchAttributes &&
                magentoMatchAttributes.map((attribute: MatchingAttributeData) => (
                    <Attribute key={attribute.value} attribute={attribute} initialAttribute={pimAttribute}/>
                ))
            )}
        </CardStyles>
    )
}