import {MappingIgnoredArea} from "@/pages/global/styles/MappingScreen";
import {KeystoneCatalogSourceAttribute} from "@/pages/types/keystone";
import {IgnoredAttribute} from "./IgnoredAttribute";
import React from "react";

type CatalogSourceAttributesProps = {
    catalogSourceAttributes: KeystoneCatalogSourceAttribute[]
}

export const GetIgnoredAttribute: React.FC = ({catalogSourceAttributes}: CatalogSourceAttributesProps) => {
    const getIgnoredAttributesAlphabeticallyOrdered = (attributes: KeystoneCatalogSourceAttribute[]): KeystoneCatalogSourceAttribute[] => {
        const list = attributes.filter((attribute: KeystoneCatalogSourceAttribute) => attribute.ignored)
        list.sort((a, b) => a.code.localeCompare(b.code))

        return list
    }

    return (
        <MappingIgnoredArea>
            <h4>Ignored Attributes</h4>
            {catalogSourceAttributes?.length>0 && getIgnoredAttributesAlphabeticallyOrdered(catalogSourceAttributes).map(
                (attribute: KeystoneCatalogSourceAttribute) => <IgnoredAttribute key={attribute.id} attribute={attribute}/>
            )}
        </MappingIgnoredArea>
    )
}