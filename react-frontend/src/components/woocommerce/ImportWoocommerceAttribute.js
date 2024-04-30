import { useEffect, useContext } from "react"
import { useMutation} from '@apollo/client';
import { CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION } from '../../graphql/keystoneQuery'
import DispatchContext from "../../DispatchContext"
import {WoocommerceImport} from "../../models/WoocommerceImport";

export default function ImportWoocommerceAttribute() {
    const woocommerceImportData = WoocommerceImport()
    const appDispatch = useContext(DispatchContext)
    const [createListAttribute] = useMutation(CREATE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            data: woocommerceImportData.getAttributesToCreate()
        }
    });

    useEffect(() => {
        async function createAttributeList() {
            try {
                if (woocommerceImportData.hasAttributesToCreate()) {
                    createListAttribute();
                    appDispatch({ type: "flashMessage", value: `${woocommerceImportData.getAttributesToCreateCount()} woocommerce attributes have been added`})
                    appDispatch({ type: "woocommerceAttributesLoad", value: woocommerceImportData.getAttributesToCreate() })
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        createAttributeList()
        return () => {

        }
    }, [woocommerceImportData.getAttributesToCreate()])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await woocommerceImportData.loadAttributes()
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <form>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Import Attributes
            </button>
        </form>
    )
}