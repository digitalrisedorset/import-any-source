import {ItemStyles} from '../../global/styles/ItemStyles';
import { Title } from '../../global/styles/Title';
import { AssignedTo } from "./AssignedTo";
import { MapLink } from "./MapLink";
import { MagentoAttribute } from "../../types/keystone";
import React from "react";

interface AttributeProps {
    attribute: MagentoAttribute
}

export const Attribute: React.FC<AttributeProps> = ({attribute}: AttributeProps) => {
    const date = new Date(attribute.createdAt)

    return (
        <ItemStyles>
            <Title>
                <MapLink attribute={attribute}/>
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <AssignedTo assignedTo={attribute.assignedTo} required={attribute.required} />
        </ItemStyles>
    )
}