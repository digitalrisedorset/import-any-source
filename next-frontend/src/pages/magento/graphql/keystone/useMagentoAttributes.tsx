import {LazyQueryResultTuple, OperationVariables, QueryResult, useLazyQuery, useQuery} from '@apollo/client';
import {ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY} from "./useCreateMagentoAttributes";
import {KeystoneMagentoAttributeData} from "../../../types/keystone";

export const useMagentoAttributes = () => {
    const magentoAttributesData: QueryResult<KeystoneMagentoAttributeData | OperationVariables> = useQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    return magentoAttributesData;
}

export const useMagentoAttributesLazy = () => {
    const [magentoAttributesData]: LazyQueryResultTuple<KeystoneMagentoAttributeData, OperationVariables> = useLazyQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    return magentoAttributesData;
}