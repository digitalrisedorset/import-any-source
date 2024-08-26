import {IgnoreStyles, ActivateButton} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '@/pages/global/styles/Title';
import {MapLink} from "../MainMappingArea/MapLink";
import {KeystoneCatalogSourceAttribute} from '@/pages/types/keystone'
import React from "react";
import {useSetCatalogSourceAttributeActive} from "../../graphql/useSetCatalogSourceAttributeActive";
import {useActiveCatalogSource} from "../../hooks/useCurrentCatalogSource";
import {useActions} from "@/pages/global/hooks/useActions";

interface AttributeProps {
    attribute: KeystoneCatalogSourceAttribute
}

export const IgnoredAttribute: React.FC<AttributeProps> = ({attribute}: AttributeProps) => {
    const currentCatalogSource = useActiveCatalogSource()
    const setCatalogSourceAttributeActivate = useSetCatalogSourceAttributeActive(attribute.id)
    const { addCatalogSourceAttributeActivated } = useActions()

    const activateField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setCatalogSourceAttributeActivate()
        addCatalogSourceAttributeActivated(currentCatalogSource.name)
    }

    return (
        <IgnoreStyles required={attribute.required}>
            <IgnoreTitle>
                <MapLink attribute={attribute}/>
            </IgnoreTitle>
            <ActivateButton onClick={activateField}>Activate</ActivateButton>
        </IgnoreStyles>
    )
}