import {IgnoreStyles, ActivateButton} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '../../../global/styles/Title';
import {MapLink} from "../MainMappingArea/MapLink";
import {KeystoneCatalogSourceAttribute} from '../../../types/keystone'
import React from "react";
import {useSetCatalogSourceAttributeActive} from "../../graphql/useSetCatalogSourceAttributeActive";
import {useActions} from "../../../global/hooks/useActions";
import {useActiveCatalogSource} from "../../hooks/useCurrentCatalogSource";

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