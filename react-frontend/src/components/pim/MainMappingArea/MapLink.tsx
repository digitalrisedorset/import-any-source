import { Link } from "react-router-dom"
import {PimAttribute} from "../../../types/keystone";

interface MapLinkProps {
    attribute: PimAttribute
}

export default function MapLink({attribute}: MapLinkProps) {
    return (
        <Link key={attribute.id} to={`/map/${attribute.code}`}>
            <strong>{attribute.name}</strong>{" "}
        </Link>
    )
}