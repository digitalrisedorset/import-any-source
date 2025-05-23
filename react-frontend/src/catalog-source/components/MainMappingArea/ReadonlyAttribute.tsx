import {ItemStyles} from '../../../global/styles/ItemStyles';
import {Title} from '../../../global/styles/Title';
import {LinkedWith} from "./LinkedWith";
import {MapLink} from "./MapLink";
import {KeystoneCatalogSourceAttribute} from '../../../types/keystone'
import React from "react";
import {useSetCatalogSourceAttributeIgnoredQueryResult} from "../../graphql/useSetCatalogSourceAttributeIgnored";
import {useActiveCatalogSource} from "../../hooks/useCurrentCatalogSource";
import {useActions} from "../../../global/hooks/useActions";

interface AttributeProps {
    attribute: KeystoneCatalogSourceAttribute
}

export const ReadonlyAttribute: React.FC<AttributeProps> = ({attribute}: AttributeProps) => {
    const currentCatalogSource = useActiveCatalogSource()
    const setCatalogSourceAttributeIgnore = useSetCatalogSourceAttributeIgnoredQueryResult(attribute.id)
    const { addCatalogSourceAttributeIgnored } = useActions()

    const date = new Date(attribute.createdAt)

    const removeField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setCatalogSourceAttributeIgnore()
        addCatalogSourceAttributeIgnored(currentCatalogSource.name)
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