import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import Attribute from "./Attribute";
import GridStyles from "../styles/GridStyles";
import { ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY } from '../../graphql/keystone'
import { MagentoAttribute, KeystoneMagentoAttributeData} from "../../types/keystone";
import { useActions } from "../../hooks/useActions";
import {LoadingDotsIcon } from "../../Loading"

export default function ReadMagentoAttribute() {
    const { addFlashMessage } = useActions()
    const { data, error, loading }: QueryResult<KeystoneMagentoAttributeData | OperationVariables> = useQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    if (!error && !loading && data) {
        addFlashMessage(`The system has loaded ${data?.magentoAttributes?.length} magento attributes`)
    }

    return (
        <GridStyles>
            <h2>Magento Attributes</h2>
            {(loading || data?.magentoAttributes?.length===0) && <LoadingDotsIcon />}
            {(data?.magentoAttributes.map((attribute: MagentoAttribute ) => (
                    <Attribute key={attribute.id} attribute={attribute}/>
                ))
            )}
        </GridStyles>
    )
}