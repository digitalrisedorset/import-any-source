import { Attribute } from "./Attribute";
import {MatchingAttributeData} from "../../types/keystone";
import React from "react";
import {useFlashMessage} from "@/state/flassMessageState";
import {CardStyles} from "@/pages/global/styles/CardStyles";

type MatchingFieldProps = {
    magentoMatches: MagentoAttribute | null
    magentoMatchAttributes: MatchingAttributeData[],
}

export const MatchingField: React.FC = ({catalogSourceAttribute, magentoMatches}: MatchingFieldProps) => {
    const { addFlashMessage } = useFlashMessage()

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