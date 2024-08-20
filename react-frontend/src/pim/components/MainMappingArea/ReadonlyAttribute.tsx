import {ItemStyles} from '../../../global/styles/ItemStyles';
import {Title} from '../../../global/styles/Title';
import {LinkedWith} from "./LinkedWith";
import {MapLink} from "./MapLink";
import {PimAttribute} from '../../../types/keystone'
import React from "react";
import {useSetPimgAttributeIgnored} from "../../graphql/useSetPimAttributeIgnored";
import {useActivePimSystem} from "../../hooks/useCurrentPimSystem";
import {useActions} from "../../../global/hooks/useActions";

interface AttributeProps {
    attribute: PimAttribute
}

export const ReadonlyAttribute: React.FC<AttributeProps> = ({attribute}: AttributeProps) => {
    const currentPimSystem = useActivePimSystem()
    const setPimAttributeIgnore = useSetPimgAttributeIgnored(attribute.id)
    const { addPimAttributeIgnored } = useActions()

    const date = new Date(attribute.createdAt)

    const removeField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setPimAttributeIgnore()
        addPimAttributeIgnored(currentPimSystem.name)
    }

    return (
        <ItemStyles required={attribute.required} id={attribute.id}>
            <Title>
                <MapLink attribute={attribute}/>
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <LinkedWith magentoCode={attribute.magentoCode}/>
        </ItemStyles>
    )
}