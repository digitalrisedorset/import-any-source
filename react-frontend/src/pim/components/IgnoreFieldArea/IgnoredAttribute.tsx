import {IgnoreStyles, ActivateButton} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '../../../global/styles/Title';
import {MapLink} from "../MainMappingArea/MapLink";
import {PimAttribute} from '../../../types/keystone'
import React from "react";
import {useSetPimgAttributeActive} from "../../graphql/useSetPimAttributeActive";
import {useActions} from "../../../global/hooks/useActions";
import {useActivePimSystem} from "../../hooks/useCurrentPimSystem";

interface AttributeProps {
    attribute: PimAttribute
}

export const IgnoredAttribute: React.FC<AttributeProps> = ({attribute}: AttributeProps) => {
    const currentPimSystem = useActivePimSystem()
    const setPimAttributeActivate = useSetPimgAttributeActive(attribute.id)
    const { addPimAttributeActivated } = useActions()

    const activateField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setPimAttributeActivate()
        addPimAttributeActivated(currentPimSystem.name)
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