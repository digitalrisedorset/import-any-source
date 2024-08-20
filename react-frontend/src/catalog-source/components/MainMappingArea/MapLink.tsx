import {Link} from "react-router-dom"
import {KeystoneCatalogSourceAttribute} from "../../../types/keystone";
import React from "react";

interface MapLinkProps {
    attribute: KeystoneCatalogSourceAttribute
}

export const MapLink: React.FC<MapLinkProps> = ({attribute}: MapLinkProps) => {
    return (
        <>
            {!attribute.magentoCode && <Link key={attribute.id} to={`/map/${attribute.code}`}>
                <strong>{attribute.name}</strong>{" "}
            </Link>}
            {attribute.magentoCode && <span key={attribute.id}>
                <strong>{attribute.name}</strong>{" "}
            </span>}
        </>
    )
}