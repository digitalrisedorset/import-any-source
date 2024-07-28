import {LazyQueryResultTuple, OperationVariables, QueryResult, useLazyQuery} from '@apollo/client';
import {GET_MAGENTO_ATTRIBUTE_LIST_QUERY} from "../../../graphql/keystone";
import {MagentoAttribute} from "../../../types/keystone";

interface MagentoQueryResult extends QueryResult {
    magentoAttributes: MagentoAttribute[]
}

export const useFindMagentoAttributes = (attributeLabel: string) => {
    const [getMagentoAttributeList]: LazyQueryResultTuple<MagentoQueryResult, OperationVariables> = useLazyQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": attributeLabel
                }
            }
        }
    });

    return getMagentoAttributeList;
}