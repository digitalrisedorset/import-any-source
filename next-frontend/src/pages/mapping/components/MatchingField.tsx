import { Attribute } from "./Attribute";
import {CardStyles} from "../../configuration/styles/CardStyles";
import {MatchingAttributeData} from "../../types/keystone";
import React from "react";
import {useAppSelector} from "@/state/store";

export const MatchingField: React.FC = () => {
    const { addFlashMessage } = useAppSelector((state) => state.flashMessage)
    const { catalogSourceAttribute, magentoMatchAttributes } = useAppSelector((state) => state.catalogSourceMapping)

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