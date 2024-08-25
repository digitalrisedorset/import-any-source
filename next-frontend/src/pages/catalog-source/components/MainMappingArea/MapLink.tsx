import Link from "next/link"
import {KeystoneCatalogSourceAttribute} from "@/pages/types/keystone";
import React from "react";

interface MapLinkProps {
    attribute: KeystoneCatalogSourceAttribute
}

export const MapLink: React.FC<MapLinkProps> = ({attribute}: MapLinkProps) => {
    return (
        <>
            {!attribute.magentoCode && <Link key={attribute.id} href={`/mapping/${attribute.code}`}>
                <strong>{attribute.name}</strong>{" "}
            </Link>}
            {attribute.magentoCode && <span key={attribute.id}>
                <strong>{attribute.name}</strong>{" "}
            </span>}
        </>
    )
}