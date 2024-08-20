import {OperationVariables, QueryResult} from "@apollo/client";
import {KeystoneCatalogSourceAttribute, CatalogSourceQueryResult} from "../../../types/keystone";
import {useCatalogSourceAttributesNotMapped} from "../../graphql/useFindCatalogSourceAttributesNotMapped";
import {useCurrentCatalogSource} from "../../hooks/useCurrentCatalogSource";
import {useMappingRemaining} from "../../../mapping/hooks/useMappingVerifier";
import React from "react";

export const CatalogSourceAttributeDescription: React.FC = () => {
    const currentCatalogSource = useCurrentCatalogSource()
    const mappingRemaining = useMappingRemaining()
    const { data }: QueryResult<CatalogSourceQueryResult | OperationVariables> = useCatalogSourceAttributesNotMapped()

    const getCountAttributesToMap = (attributes: KeystoneCatalogSourceAttribute[]): string => {
        if (mappingRemaining === 0) {
            return '(all the attributes are mapped)'
        } else {
            return `(${mappingRemaining} attributes are still to find mapping)`
        }
    }

    return (
       <h2>{currentCatalogSource} Attributes {data && getCountAttributesToMap(data?.catalogSourceAttributes)}</h2>
    )
}