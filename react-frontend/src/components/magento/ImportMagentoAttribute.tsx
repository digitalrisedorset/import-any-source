import {useEffect, FormEvent} from "react"
import {OperationVariables, QueryResult, useMutation, useQuery} from '@apollo/client';
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY,
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
    CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION
} from '../../graphql/keystone'
import { GET_MAGENTO_ATTRIBUTE_LIST_QUERY } from '../../graphql/magentoQuery'
import {RemoteMagentoAttributeProvider} from "../../models/RemoteMagentoAttributeProvider";
import {useActions} from "../../hooks/useActions";
import {MagentoAttributeData} from "../../types/magento";

export default function ImportMagentoAttribute(): JSX.Element {
    const { addFlashMessage } = useActions()
    const magentoImportProvider = RemoteMagentoAttributeProvider()
    const [createListAttribute] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            data: magentoImportProvider.getAttributesToCreate()
        },
        refetchQueries: [{ query: ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY }],
    });
    const { data, error, loading }: QueryResult<MagentoAttributeData | OperationVariables> = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    useEffect(() => {
        async function createAttributeList() {
            try {
                if (magentoImportProvider.hasAttributesToCreate()) {
                    createListAttribute();
                    addFlashMessage(`${magentoImportProvider.getAttributesToCreateCount()} magento attributes have been added`)
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        createAttributeList()
        return () => {

        }
    }, [magentoImportProvider.hasAttributesToCreate()])

    if (loading) return <>Loading...</>

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            if (data?.attributesList?.items) {
                magentoImportProvider.setAttributeListToCreate(data?.attributesList?.items)
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Import Magento Attributes
            </button>
        </form>
    )
}