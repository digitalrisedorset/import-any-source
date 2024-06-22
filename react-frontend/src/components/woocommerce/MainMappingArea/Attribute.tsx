import ItemStyles from '../../styles/ItemStyles';
import { Title } from '../../styles/Title';
import { LinkedWith } from "./LinkedWith";
import MapLink from "./MapLink";
import { WoocommerceAttribute } from '../../../types/keystone'
import styled from "styled-components";
import React from "react";
import {useMutation} from "@apollo/client";
import { UPDATE_ATTRIBUTE_MUTATION} from "../../../graphql/keystone";

const DeleteButton = styled.button`
  background: black;
  color: white;
  font-size: 8px;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
    bottom:0;
    padding:4px 8px;
`;

interface AttributeProps {
    attribute: WoocommerceAttribute
}

export function Attribute({attribute}: AttributeProps): JSX.Element {
    const [setWoocommerceAttributeIgnore] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":attribute.id},
            "data": {
                "ignored": true
            }
        },
        update
    });

    const date = new Date(attribute.createdAt)

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updateWoocommerceAttribute));
    }

    const removeField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setWoocommerceAttributeIgnore()
    }

    return (
        <ItemStyles required={attribute.required} delete={true}>
            <Title>
                <MapLink attribute={attribute}/>
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <LinkedWith magentoCode={attribute.magentoCode}/>
            <DeleteButton onClick={removeField}>Delete</DeleteButton>
        </ItemStyles>
    )
}