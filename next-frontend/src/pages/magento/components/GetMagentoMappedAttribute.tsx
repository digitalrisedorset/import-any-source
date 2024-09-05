import {useMagentoAttributes} from "../graphql/keystone/useMagentoAttributes";
import {MagentoAttribute} from "../../types/keystone";
import {Attribute} from "./Attribute";
import React from "react";
import {CardStyles} from "@/pages/global/styles/CardStyles";

export const GetMagentoMappedAttribute: React.FC = () => {
    const { data, loading } = useMagentoAttributes()

    const getActiveAttributes = (attributes: MagentoAttribute[]): MagentoAttribute[] => {
        return attributes?.filter((attribute: MagentoAttribute) => attribute.assignedTo.length>0)
    }

    if (!loading && getActiveAttributes(data?.magentoAttributes).length === 0) return <CardStyles><h3>No Attribute is mapped yet</h3></CardStyles>

    return (
        <CardStyles>
            <h3>Magento mapped attributes</h3>
            {!loading && getActiveAttributes(data?.magentoAttributes).map(
                (attribute) => <Attribute key={attribute.id} attribute={attribute}/>
            )}
        </CardStyles>
    )
}