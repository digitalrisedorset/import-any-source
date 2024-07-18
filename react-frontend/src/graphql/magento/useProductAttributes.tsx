import {OperationVariables, QueryResult, useQuery} from '@apollo/client';
import {RemoteMagentoAttributeData} from "../../types/magento";
import {GET_MAGENTO_ATTRIBUTE_LIST_QUERY} from "../magentoQuery";

export const useProductAttributes = () => {
    const productAttributesData: QueryResult<RemoteMagentoAttributeData | OperationVariables> = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    return productAttributesData;
}