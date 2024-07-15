import {IgnoreStyles, ActivateButton} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '../../styles/Title';
import MapLink from "../MainMappingArea/MapLink";
import { WoocommerceAttribute } from '../../../types/keystone'
import React from "react";
import {useMutation} from "@apollo/client";
import {UPDATE_ATTRIBUTE_MUTATION} from "../../../graphql/keystone";

interface AttributeProps {
    attribute: WoocommerceAttribute
}

export function IgnoredAttribute({attribute}: AttributeProps): JSX.Element {
    const [setWoocommerceAttributeActivate] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":attribute.id},
            "data": {
                "ignored": false
            }
        },
        update
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updateWoocommerceAttribute));
    }

    const activateField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setWoocommerceAttributeActivate()
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