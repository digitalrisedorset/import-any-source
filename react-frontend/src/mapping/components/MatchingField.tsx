import { Attribute } from "./Attribute";
import {CardStyles} from "../../configuration/styles/CardStyles";
import {useTypedSelector} from "../../global/hooks/useTypedSelector";
import {MatchingAttributeData} from "../../types/keystone";
import {useActions} from "../../global/hooks/useActions";
import React from "react";

export const MatchingField: React.FC = () => {
    const { addFlashMessage } = useActions()
    const { catalogSourceAttribute, magentoMatchAttributes } = useTypedSelector((state) => state.catalogSourceMapping)

    addFlashMessage(`The system has found ${magentoMatchAttributes.length} possible matching magento attributes`)

    return (
        <CardStyles>
            <h2>Matching Attributes</h2>
            {(catalogSourceAttribute && magentoMatchAttributes &&
                magentoMatchAttributes.map((attribute: MatchingAttributeData) => (
                    <Attribute key={attribute.value} attribute={attribute} initialAttribute={catalogSourceAttribute}/>
                ))
            )}
        </CardStyles>
    )
}