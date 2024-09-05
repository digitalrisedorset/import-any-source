import {Attribute} from "./Attribute";
import {MagentoAttribute} from "../../types/keystone";
import {CardStyles} from "@/pages/global/styles/CardStyles";
import React from "react";

type MagentoAttributesProps = {
    magentoAttributes: MagentoAttribute[]
}

export const ReadMagentoAttribute = ({magentoAttributes}:MagentoAttributesProps) => {
    return (
        <CardStyles>
            <h2>Magento Attributes</h2>
            {(magentoAttributes.map((attribute: MagentoAttribute ) => (
                    <Attribute key={attribute.id} attribute={attribute}/>
                ))
            )}
        </CardStyles>
    )
}