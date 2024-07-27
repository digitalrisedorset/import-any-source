import {Link} from "react-router-dom"
import {PimAttribute} from "../../../types/keystone";

interface MapLinkProps {
    attribute: PimAttribute
}

export const MapLink = ({attribute}: MapLinkProps) => {
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