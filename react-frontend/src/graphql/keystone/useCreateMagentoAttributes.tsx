import { useMutation} from '@apollo/client';
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY,
    ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY,
    CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION
} from "../keystone";

export const useCreateMagentoAttributes = () => {
    const [createListAttribute ] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY }, {query: ALL_PIM_ATTRIBUTES_NOT_MAPPED_QUERY}]
    });

    return createListAttribute;
}