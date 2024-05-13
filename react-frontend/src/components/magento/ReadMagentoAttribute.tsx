import {useQuery} from "@apollo/client";
import Attribute from "./Attribute";
import CartStyles from "../styles/CartStyles";
import { ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY } from '../../graphql/keystone'
import { MagentoAttribute, MagentoAttributeData} from "../../types";
import { useActions } from "../../hooks/useActions";

export default function ReadMagentoAttribute() {
    const { addFlashMessage } = useActions()
    const { data, error, loading } = useQuery<MagentoAttributeData>(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    if (!error && !loading && data) {
        addFlashMessage(`The system has loaded ${data.magentoAttributes.length} magento attributes`)
    }

    return (
        <CartStyles>
            <h2>Magento Attributes</h2>
            {(data && data!.magentoAttributes.map((attribute: MagentoAttribute ) => (
                    <Attribute key={attribute.id} attribute={attribute}/>
                ))
            )}
        </CartStyles>
    )
}