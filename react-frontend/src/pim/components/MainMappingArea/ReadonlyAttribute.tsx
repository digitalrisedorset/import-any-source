import ItemStyles from '../../../global/components/ItemStyles';
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
    attribute: PimAttribute
}

export const ReadonlyAttribute = ({attribute}: AttributeProps) => {
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
        <ItemStyles required={attribute.required} candelete="true" id={attribute.id}>
            <Title>
                <MapLink attribute={attribute}/>
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <LinkedWith magentoCode={attribute.magentoCode}/>
        </ItemStyles>
    )
}