import { Attribute } from "./Attribute";
import {CardStyles} from "../../configuration/styles/CardStyles";
import {MatchingAttributeData} from "../../types/keystone";
import React from "react";
import {useCatalogSourceMapping} from "@/state/catalogSourceMappingState";
import {useFlashMessage} from "@/state/flassMessageState";

export const MatchingField: React.FC = () => {
    const { addFlashMessage } = useFlashMessage()
    const { catalogSourceAttribute, magentoMatches } = useCatalogSourceMapping()
    //addFlashMessage(`The system has found ${magentoMatchAttributes?.length} possible matching magento attributes`)

    return (
        <CardStyles>
            <h2>Matching Attributes</h2>
            {(catalogSourceAttribute && magentoMatches &&
                magentoMatches.map((attribute: MatchingAttributeData) => (
                    <Attribute key={attribute.value} attribute={attribute} initialAttribute={catalogSourceAttribute}/>
                ))
            )}
        </CardStyles>
    )
}