import { useEffect} from "react"
import { useMutation} from '@apollo/client';
import {
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
    CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION
} from '../../../graphql/keystone'
import {useActions} from "../../../hooks/useActions";
import {RemoteWoocommerceAttributeProvider} from "../../../models/RemoteWoocommerceAttributeProvider"
import {useNavigate} from "react-router-dom";

export default function ImportWoocommerceAttribute() {
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const remoteAttributeProvider = RemoteWoocommerceAttributeProvider()
    const [createListAttribute] = useMutation(CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            data: remoteAttributeProvider.getAttributesToCreate()
        },
        refetchQueries: [{ query: ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY }],
    });

    useEffect(() => {
        async function createAttributeList() {
            try {
                if (remoteAttributeProvider.hasAttributesToCreate()) {
                    createListAttribute();
                    addFlashMessage(`${remoteAttributeProvider.getAttributesToCreateCount()} woocommerce attributes have been added`)
                    navigate(`/woocommerce`);
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        createAttributeList()
        return () => {

        }
    }, [remoteAttributeProvider.getAttributesToCreate()])

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            await remoteAttributeProvider.loadAttributes()
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <h2>Step 1</h2>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Import Woocommerce Attributes
            </button>
        </form>
    )
}