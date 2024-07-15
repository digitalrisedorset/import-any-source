import {OperationVariables, QueryResult, useMutation, useQuery} from '@apollo/client';
import {
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
    CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION
} from '../../../graphql/keystone'
import {useActions} from "../../../hooks/useActions";
import {RemoteWoocommerceAttributeProvider} from "../../../models/RemoteWoocommerceAttributeProvider"
import {useNavigate} from "react-router-dom";
import {WoocommerceAttributeData} from "../../../types/keystone";
import {LoadingDotsIcon} from "../../../Loading";
import {useState} from "react";

export default function ImportWoocommerceAttribute() {
    const [importing, setImporting] = useState(false)
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemoteWoocommerceAttributeProvider()
    const [createListAttribute] = useMutation(CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION, {
        refetchQueries: [{ query: ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY }],
    });
    const woocommerceAttributeData: QueryResult<WoocommerceAttributeData | OperationVariables> = useQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    const isWoocommerceImportComplete = () => {
        if (woocommerceAttributeData?.data?.woocommerceAttributes?.length !== undefined) {
            return woocommerceAttributeData?.data?.woocommerceAttributes?.length > 0
        }
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            setImporting(true)
            remoteAttributeProvider.loadAttributes().then(response => {
                createListAttribute({
                    variables: {
                        data: response
                    },
                });
                addFlashMessage(`${response.length} woocommerce attributes have been added`)
                setImporting(false)
                navigate(`/woocommerce`);
            })
        } catch (e) {
            console.log('error');
            setImporting(false)
        }
    }

    if (importing) return <LoadingDotsIcon />

    return (
        <form>
            <h2>Step 1</h2>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block" disabled={isWoocommerceImportComplete()}>
                Import Woocommerce Attributes
            </button>
        </form>
    )
}