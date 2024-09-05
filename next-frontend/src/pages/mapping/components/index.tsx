import { MapField } from "./MapField";
import { MatchingField } from "./MatchingField";
import React from "react";
import {useCatalogSourceMapping} from "@/state/catalogSourceMappingState";

export const Map: React.FC = () => {
    const { catalogSourceAttribute, magentoMatches } = useCatalogSourceMapping()

    return (
        <>
            <MapField />
            <MatchingField catalogSourceAttribute={catalogSourceAttribute} magentoMatches={magentoMatches} />
        </>
    )
}