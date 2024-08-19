import { Attribute } from "./Attribute";
import {CardStyles} from "../../../configuration/styles/CardStyles";
import {PimAttribute} from '../../../types/keystone'
import {PimAttributeDescription} from "./PimAttributeDescription";
import {LoadingDotsIcon} from "../../../global/components/Loading";
import {usePimAttributes} from "../../graphql/usePimAttributes";
import React from "react";

export const GetPimAttribute: React.FC = () => {
    const { data, error, loading } = usePimAttributes()
    const candelete = "true"

    const getActiveAttributes = (attributes: PimAttribute[]): PimAttribute[] => {
        return attributes.filter((attribute: PimAttribute) => !attribute.ignored)
    }

    return (
        <CardStyles>
            <PimAttributeDescription />
            {error && <h3>{error.message}</h3>}
            {loading && <LoadingDotsIcon />}
            {!loading && getActiveAttributes(data?.pimAttributes).map(
                (attribute) => <Attribute key={attribute.id} candelete={candelete} attribute={attribute}/>
            )}
        </CardStyles>
    )
}