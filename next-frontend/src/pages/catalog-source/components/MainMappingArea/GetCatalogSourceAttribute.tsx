import { Attribute } from "./Attribute";
import {CardStyles} from "@/pages/global/styles/CardStyles";
import {KeystoneCatalogSourceAttribute} from '@/pages/types/keystone'
import {CatalogSourceAttributeDescription} from "./CatalogSourceAttributeDescription";
import {LoadingDotsIcon} from "@/pages/global/components/Loading";
import {useCatalogSourceAttributes} from "../../graphql/useCatalogSourceAttributes";
import React from "react";

export const GetCatalogSourceAttribute: React.FC = () => {
    const { data, error, loading } = useCatalogSourceAttributes()
    const candelete = "true"

    const getActiveAttributes = (attributes: KeystoneCatalogSourceAttribute[]): KeystoneCatalogSourceAttribute[] => {
        return attributes.filter((attribute: KeystoneCatalogSourceAttribute) => !attribute.ignored)
    }

    return (
        <CardStyles>
            <CatalogSourceAttributeDescription />
            {error && <h3>{error.message}</h3>}
            {loading && <LoadingDotsIcon />}
            {!loading && getActiveAttributes(data?.catalogSourceAttributes).map(
                (attribute) => <Attribute key={attribute.id} candelete={candelete} attribute={attribute}/>
            )}
        </CardStyles>
    )
}