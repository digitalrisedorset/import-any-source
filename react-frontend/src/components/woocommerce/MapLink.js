import MapStyle from './../styles/MapStyle';
import { Link } from "react-router-dom"

export default function MapLink({attribute}) {
    return (
        <Link key={attribute.id} to={`/map/${attribute.code}`}>
            <strong>{attribute.name}</strong>{" "}
        </Link>
    )
}