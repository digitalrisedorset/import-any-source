import ItemStyles from './../styles/ItemStyles';
import Title from './../styles/Title';
import { LinkedWith } from "./LinkedWith";
import MapLink from "./MapLink";
import { WoocommerceAttribute } from '../../types'

interface AttributeProps {
    attribute: WoocommerceAttribute
}

export function Attribute({attribute}: AttributeProps): JSX.Element {
    const date = new Date(attribute.createdAt)

    return (
        <ItemStyles required={attribute.required}>
            <Title>
                <MapLink attribute={attribute} />
            </Title>
            <span className="type">{attribute.type}</span>
            <span className="date-created">created: <br/>{date.toDateString()} </span>
            <LinkedWith magentoCode={attribute.magentoCode}/>
        </ItemStyles>
    )
}