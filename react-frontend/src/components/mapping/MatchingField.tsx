import { Attribute } from "./Attribute";
import GridStyles from "../styles/GridStyles";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {MatchingAttributeData} from "../../types/keystone";
import { useActions } from "../../hooks/useActions";

export function MatchingField() {
    const { addFlashMessage } = useActions()
    const { pimAttribute, magentoMatchAttributes } = useTypedSelector((state) => state.pimMapping)

    addFlashMessage(`The system has found ${magentoMatchAttributes.length} possible matching magento attributes`)

    return (
        <GridStyles>
            <h2>Matching Attributes</h2>
            {(pimAttribute && magentoMatchAttributes &&
                magentoMatchAttributes.map((attribute: MatchingAttributeData) => (
                    <Attribute key={attribute.value} attribute={attribute} initialAttribute={pimAttribute}/>
                ))
            )}
        </GridStyles>
    )
}