import {useEffect, useContext, FormEvent} from "react"
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, GET_MAGENTO_ATTRIBUTE_LIST_QUERY } from '../../graphql/keystone'
//import DispatchContext from "../../DispatchContext";
//import {MagentoImport} from "../../models/MagentoImport";
import {MagentoAttributeData, WoocommerceAttributeData} from "../../types";

export default function ImportMagentoAttribute() {
    //const magentoImportData = MagentoImport()
    const magentoImportData = {}
    //const appDispatch = useContext(DispatchContext)
    const [createListAttribute] = useMutation(CREATE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            //data: magentoImportData.getAttributesToCreate()
        }
    });
    const { data, error, loading } = useQuery<MagentoAttributeData>(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {}, context: {clientName: 'magento'}
    });

    useEffect(() => {
        // async function createAttributeList() {
        //     try {
        //         //if (magentoImportData.hasAttributesToCreate()) {
        //             createListAttribute();
        //             //appDispatch({ type: "flashMessage", value: `${magentoImportData.getAttributesToCreateCount()} magento attributes have been added`})
        //             //appDispatch({ type: "magentoAttributesLoad", value: magentoImportData.getAttributesToCreate() })
        //         //}
        //     } catch (e) {
        //         console.log("There was a problem.")
        //     }
        // }
        // createAttributeList()
        return () => {

        }
    }, [/*magentoImportData.hasAttributesToCreate()*/])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            //magentoImportData.setAttributeListToCreate(data.attributesList.items)
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