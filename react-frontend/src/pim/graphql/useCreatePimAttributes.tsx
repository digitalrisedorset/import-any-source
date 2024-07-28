import { useMutation} from '@apollo/client';
import {CREATE_PIM_ATTRIBUTE_LIST_MUTATION} from "../../graphql/keystone";
import {ALL_PIM_PRODUCT_ATTRIBUTES_QUERY} from "./usePimAttributes";

export const useCreatePimAttributes = () => {
    const [createListAttribute] = useMutation(CREATE_PIM_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_PIM_PRODUCT_ATTRIBUTES_QUERY }],
    });

    return createListAttribute;
}