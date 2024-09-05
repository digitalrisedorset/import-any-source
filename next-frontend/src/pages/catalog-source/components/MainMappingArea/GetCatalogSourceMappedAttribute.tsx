import {CardStyles} from "@/pages/global/styles/CardStyles";
import {KeystoneCatalogSourceAttribute} from '@/pages/types/keystone'
import {useCatalogSourceAttributes} from "../../graphql/useCatalogSourceAttributes";
import {Attribute} from "./Attribute";
import {useCurrentCatalogSource} from "../../hooks/useCurrentCatalogSource";
import {LoadingDotsIcon} from "@/pages/global/components/Loading";
import React from "react";

export const GetCatalogSourceMappedAttribute: React.FC = () => {
    const currentCatalogSource = useCurrentCatalogSource()
    const { data, loading } = useCatalogSourceAttributes()

    const getActiveAttributes = (attributes: KeystoneCatalogSourceAttribute[]): KeystoneCatalogSourceAttribute[] => {
        return attributes.filter((attribute: KeystoneCatalogSourceAttribute) => attribute.magentoCode?.code!==undefined)
    }

    if (loading) return <LoadingDotsIcon />

    if (getActiveAttributes(data?.catalogSourceAttributes).length === 0) return <CardStyles><h3>No Attribute is mapped yet</h3></CardStyles>

    return (
        <CardStyles>
            <h3>{currentCatalogSource} mapped attributes</h3>
            {!loading && getActiveAttributes(data?.catalogSourceAttributes).map(
                (attribute) => <Attribute key={attribute.id} candelete={"false"} attribute={attribute}/>
            )}
        </CardStyles>
    )
}