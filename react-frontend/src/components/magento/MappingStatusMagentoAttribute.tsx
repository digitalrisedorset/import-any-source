import {KeystoneMagentoAttributeData, MagentoAttribute} from "../../types/keystone";
import AwaitingLinkStyle from "../styles/AwaitingLinkStyle";

interface MagentoAttributeProps {
    data: KeystoneMagentoAttributeData | undefined
}

export function MappingStatusMagentoAttribute(props: MagentoAttributeProps): JSX.Element {
    return (
        <AwaitingLinkStyle>
            <h2>Magento Attributes Awaiting Link</h2>
            {(props.data?.magentoAttributes.map((attribute: MagentoAttribute ) => (
                <>
                {attribute.assignedTo && (
                    <p>{attribute.name} (code:{attribute.code}, linked with {attribute.assignedTo.name})</p>
                    )}
                {!attribute.assignedTo && (
                    <p>{attribute.name} (code:{attribute.code})</p>
                    )}
                </>
            )))}
        </AwaitingLinkStyle>
    )
}