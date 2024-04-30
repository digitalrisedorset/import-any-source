import { Link } from "react-router-dom"
import ItemStyles from './../styles/ItemStyles';
import Title from './../styles/Title';

export default function Attribute({attribute}) {
    const date = new Date(attribute.createdAt)

    return (
        <ItemStyles>
            <Title>
                <Link key={attribute.id} to={`/post/${attribute.id}`} className="list-group-item list-group-item-action">
                    <strong>{attribute.name}</strong>{" "}
                </Link>
            </Title>
            <span>type: {attribute.type} attribute</span>
            <span className="text-muted small">created: {date.toDateString()} </span>
        </ItemStyles>
    )
}