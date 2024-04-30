import { useEffect, useContext } from "react"
import { useMutation, useQuery } from '@apollo/client';
import { GET_MAGENTO_ATTRIBUTE_LIST_QUERY} from "../../graphql/magentoQuery";
import { CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION } from '../../graphql/keystoneQuery'
import DispatchContext from "../../DispatchContext";
import {MagentoImport} from "../../models/MagentoImport";

export default function ImportMagentoAttribute() {
    const magentoImportData = MagentoImport()
    const appDispatch = useContext(DispatchContext)
    const [createListAttribute] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            data: magentoImportData.getAttributesToCreate()
        }
    });
    const { data, status, error, loading } = useQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    useEffect(() => {
        async function createAttributeList() {
            try {
                if (magentoImportData.hasAttributesToCreate()) {
                    createListAttribute();
                    appDispatch({ type: "flashMessage", value: `${magentoImportData.getAttributesToCreateCount()} magento attributes have been added`})
                    appDispatch({ type: "magentoAttributesLoad", value: magentoImportData.getAttributesToCreate() })
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        createAttributeList()
        return () => {

        }
    }, [magentoImportData.hasAttributesToCreate()])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            magentoImportData.setAttributeListToCreate(data.attributesList.items)
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