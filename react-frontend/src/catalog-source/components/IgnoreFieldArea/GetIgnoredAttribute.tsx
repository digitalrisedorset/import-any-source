import {MappingIgnoredArea} from "../../../global/styles/MappingScreen";
import {KeystoneCatalogSourceAttribute} from "../../../types/keystone";
import {IgnoredAttribute} from "./IgnoredAttribute";
import {useCatalogSourceAttributes} from "../../graphql/useCatalogSourceAttributes";
import React from "react";

export const GetIgnoredAttribute: React.FC = () => {
    const { data, error, loading } = useCatalogSourceAttributes()

    const getIgnoredAttributesAlphabeticallyOrdered = (attributes: KeystoneCatalogSourceAttribute[]): KeystoneCatalogSourceAttribute[] => {
        const list = attributes.filter((attribute: KeystoneCatalogSourceAttribute) => attribute.ignored)
        list.sort((a, b) => a.code.localeCompare(b.code))

        return list
    }

    return (
        <MappingIgnoredArea>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <h4>Ignored Attributes</h4>
            {data && getIgnoredAttributesAlphabeticallyOrdered(data?.catalogSourceAttributes).map(
                (attribute: KeystoneCatalogSourceAttribute) => <IgnoredAttribute key={attribute.id} attribute={attribute}/>
            )}
        </MappingIgnoredArea>
    )
}