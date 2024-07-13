import { FormEvent} from "react"
import {OperationVariables, QueryResult, useMutation, useQuery} from '@apollo/client';
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY,
    CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION
} from '../../graphql/keystone'
import { GET_MAGENTO_ATTRIBUTE_LIST_QUERY } from '../../graphql/magentoQuery'
import {RemoteMagentoAttributeProvider} from "../../models/RemoteMagentoAttributeProvider";
import {useActions} from "../../hooks/useActions";
import {useNavigate} from "react-router-dom";
import {KeystoneMagentoAttributeData} from "../../types/keystone";
import {MagentoAttributeData} from "../../types/magento"

interface MagentoAttributeProps {
    data: KeystoneMagentoAttributeData | undefined
}

export default function ImportMagentoAttribute(props: MagentoAttributeProps) {
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const magentoImportProvider = RemoteMagentoAttributeProvider()
    const [createListAttribute, {data: attributes, error: updateError, loading: updateLoading} ] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY }],
    });
    const { data, loading }: QueryResult<MagentoAttributeData | OperationVariables> = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    const isMagentoImportComplete = () => {
        if (props.data?.magentoAttributes?.length !== undefined) {
            return props.data?.magentoAttributes?.length > 0
        }
    }

    if (loading) return <>Loading...</>

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            if (data?.attributesList?.items) {
                const attributes = magentoImportProvider.setAttributeListToCreate(data?.attributesList?.items)
                createListAttribute({
                    variables: {
                        data: attributes
                    },
                });
                addFlashMessage(`${attributes.length} magento attributes have been added`)
                navigate(`/magento`);
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <h2>Step 2</h2>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block" disabled={isMagentoImportComplete()}>
                Import Magento Attributes
            </button>
        </form>
    )
}