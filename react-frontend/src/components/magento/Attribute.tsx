import ItemStyles from './../styles/ItemStyles';
import Title from './../styles/Title';
import { AssignedTo } from "./AssignedTo";
import { MapLink } from "./MapLink";
import { MagentoAttribute } from "../../types/keystone";

interface AttributeProps {
    attribute: MagentoAttribute
}

export default function Attribute({attribute}: AttributeProps): JSX.Element {
    const date = new Date(attribute.createdAt)

    return (
        <ItemStyles>
            <Title>
                <MapLink attribute={attribute} />
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <AssignedTo assignedTo={attribute.assignedTo}/>
        </ItemStyles>
    )
}