import {IgnoreStyles} from '../../styles/IgnoreStyles';
import {IgnoreTitle} from '../../styles/Title';
import MapLink from "../MainMappingArea/MapLink";
import { WoocommerceAttribute } from '../../../types/keystone'
import styled from "styled-components";
import React from "react";
import {useMutation} from "@apollo/client";
import {
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, IGNORED_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
    UPDATE_ATTRIBUTE_MUTATION
} from "../../../graphql/keystone";

const ActivateButton = styled.button`
  background: black;
  color: white;
  font-size: 8px;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 5px;
    top:10px;
    padding:4px 6px;
`;

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
        update,
        refetchQueries: [{query: ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY}, {query: IGNORED_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY}]
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updateWoocommerceAttribute));
    }

    const date = new Date(attribute.createdAt)

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