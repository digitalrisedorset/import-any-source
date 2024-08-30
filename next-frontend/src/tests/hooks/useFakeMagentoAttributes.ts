import {ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY} from "@/pages/magento/graphql/keystone/useCreateMagentoAttributes";

export const useFakeMagentoAttributes = () => {
    const magentoAttributes = fakeMagentoAttributes()

    const mocks = [
        {
            request: {query: ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, variables: {}},
            result: {
                data: {
                    magentoAttributes: magentoAttributes
                }
            }
        }
    ]

    return mocks;
}