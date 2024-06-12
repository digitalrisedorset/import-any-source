import { Link } from "react-router-dom"
import {WoocommerceAttribute} from "../../../types/keystone";

interface MapLinkProps {
    attribute: WoocommerceAttribute
}

export default function MapLink({attribute}: MapLinkProps): JSX.Element {
    return (
        <Link key={attribute.id} to={`/map/${attribute.code}`}>
            <strong>{attribute.name}</strong>{" "}
        </Link>
    )
}