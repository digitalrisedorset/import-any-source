import {Link} from "react-router-dom"
import {MagentoAttribute} from "../../types/keystone";

interface AttributeProps {
    attribute: MagentoAttribute
}

export const MapLink = ({attribute}: AttributeProps) => {
    return (
        <Link key={attribute.id} to={`/map/${attribute.code}`}>
            <span>{attribute.name}</span>{" "}
        </Link>
    )
}