import {IgnoreStyles, ActivateButton} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '../../styles/Title';
import MapLink from "../MainMappingArea/MapLink";
import { PimAttribute } from '../../../types/keystone'
import React from "react";
import {useSetPimgAttributeActive} from "../../../graphql/keystone/useSetPimAttributeActive";

interface AttributeProps {
    attribute: PimAttribute
}

export function IgnoredAttribute({attribute}: AttributeProps): JSX.Element {
    const setPimAttributeActivate = useSetPimgAttributeActive(attribute.id)

    const activateField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setPimAttributeActivate()
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