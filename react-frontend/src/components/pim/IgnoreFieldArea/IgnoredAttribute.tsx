import {IgnoreStyles, ActivateButton} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '../../styles/Title';
import MapLink from "../MainMappingArea/MapLink";
import { PimAttribute } from '../../../types/keystone'
import React from "react";
import {useMutation} from "@apollo/client";
import {UPDATE_ATTRIBUTE_MUTATION} from "../../../graphql/keystone";

interface AttributeProps {
    attribute: PimAttribute
}

export function IgnoredAttribute({attribute}: AttributeProps): JSX.Element {
    const [setPimAttributeActivate] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":attribute.id},
            "data": {
                "ignored": false
            }
        },
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updatePimAttribute));
    }

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