import { useMutation} from '@apollo/client';
import {
     ALL_PIM_PRODUCT_ATTRIBUTES_QUERY,
     CREATE_PIM_ATTRIBUTE_LIST_MUTATION
} from "../keystone";

export const useCreatePimAttributes = () => {
    const [createListAttribute] = useMutation(CREATE_PIM_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_PIM_PRODUCT_ATTRIBUTES_QUERY }],
    });

    return createListAttribute;
}