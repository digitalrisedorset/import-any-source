import ItemStyles from '../../../global/styles/ItemStyles';
import {Title} from '../../../global/styles/Title';
import {LinkedWith} from "./LinkedWith";
import {MapLink} from "./MapLink";
import {PimAttribute} from '../../../types/keystone'
import React from "react";
import {DeleteButton} from "../../../global/styles/MappingScreen";
import {useSetPimgAttributeIgnored} from "../../graphql/useSetPimAttributeIgnored";
import {useActivePimSystem} from "../../hooks/useCurrentPimSystem";
import {useActions} from "../../../global/hooks/useActions";

interface AttributeProps {
    attribute: PimAttribute,
    candelete: "true" | "false"
}

export const Attribute: React.FC<AttributeProps> = ({attribute, candelete}: AttributeProps) => {
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
        <ItemStyles required={attribute.required} candelete={candelete} id={attribute.id}>
            <Title>
                <MapLink attribute={attribute}/>
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <LinkedWith magentoCode={attribute.magentoCode}/>
            {candelete=== 'true' && <DeleteButton onClick={removeField}>Delete</DeleteButton>}
        </ItemStyles>
    )
}