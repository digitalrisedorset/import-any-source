import {useProductImport} from "../../../pim/hooks/useProductImport";
import {gql, LazyQueryResultTuple, OperationVariables, useLazyQuery} from "@apollo/client";
import {MagentoProductQueryResult} from "../../types/magento";

export const ALL_MAGENTO_PRODUCT_QUERY = gql`
   query MagentoProducts($filter: ProductAttributeFilterInput!) {
      products(filter: $filter) {
        items {       
          sku
          name      
        }
      }
   }
`;

export const useMagentoProducts = () => {
    const {pimProducts} = useProductImport()

    const skuList = () => {
        return pimProducts.map((product: any) => product['sku'])
    }

    const [getProductDataBySku]: LazyQueryResultTuple<MagentoProductQueryResult, OperationVariables> = useLazyQuery(ALL_MAGENTO_PRODUCT_QUERY, {
        variables: {
            "filter": {
                "sku": {
                    "in": skuList()
                }
            }
        },
        context: {clientName: 'magento'},
        fetchPolicy: 'cache-and-network'
    });

    return getProductDataBySku
}
