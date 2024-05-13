import { Link } from "react-router-dom"
import {MagentoAttribute} from "../../types";

interface AttributeProps {
    attribute: MagentoAttribute
}

export function MapLink({attribute}: AttributeProps) {
    return (
        <Link key={attribute.id} to={`/map/${attribute.code}`}>
            <strong>{attribute.name}</strong>{" "}
        </Link>
    )
}