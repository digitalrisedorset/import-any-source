import ItemStyles from '../../styles/ItemStyles';
import { Title } from '../../styles/Title';
import { LinkedWith } from "./LinkedWith";
import MapLink from "./MapLink";
import { PimAttribute } from '../../../types/keystone'
import React from "react";
import {DeleteButton} from "../../styles/MappingScreen";
import {useSetPimgAttributeIgnored} from "../../../graphql/keystone/useSetPimAttributeIgnored";

interface AttributeProps {
    attribute: PimAttribute
}

export function Attribute({attribute}: AttributeProps) {
    const setPimAttributeIgnore = useSetPimgAttributeIgnored(attribute.id)

    const date = new Date(attribute.createdAt)

    const removeField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setPimAttributeIgnore()
    }

    return (
        <ItemStyles required={attribute.required} candelete="true">
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