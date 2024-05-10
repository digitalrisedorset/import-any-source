import { Link } from "react-router-dom"
import {WoocommerceAttribute} from "../../types";

interface MapLinkProps {
    attribute: WoocommerceAttribute
}

export default function MapLink({attribute}: MapLinkProps) {
    return (
        <Link key={attribute.id} to={`/map/${attribute.code}`}>
            <strong>{attribute.name}</strong>{" "}
        </Link>
    )
}