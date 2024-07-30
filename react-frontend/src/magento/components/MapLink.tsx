import {Link} from "react-router-dom"
import {MagentoAttribute} from "../../types/keystone";

interface AttributeProps {
    attribute: MagentoAttribute
}

export const MapLink = ({attribute}: AttributeProps) => {
    return (
        <>
            {attribute.assignedTo.length===0 && <Link key={attribute.id} to={`/map/${attribute.code}`}>
                <span>{attribute.name}</span>{" "}
            </Link>}
            {attribute.assignedTo.length>0 && <span key={attribute.id}>
                    <strong>{attribute.name}</strong>{" "}
            </span>}
        </>
    )
}