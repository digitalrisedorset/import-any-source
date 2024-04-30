import { useEffect, useState, useContext } from "react"
import { useMutation, useLazyQuery } from '@apollo/client';
import {
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
    DELETE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION,
    GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY
} from '../../graphql/keystoneQuery'
import StateContext from "../../StateContext";
import {woocommerceModel} from "../../models/WoocommerceData";

export default function RemoveWoocommerceAttribute() {
    const appState = useContext(StateContext)
    const woocommerce = woocommerceModel(appState)
    const [attributeStateIdList, setAttributeStateIdList] = useState([]);
    const [getAttributeList, { loading, attributes }] = useLazyQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    const [deleteAttributeList] = useMutation(DELETE_WOOCOMMERCE_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            "where": attributeStateIdList
        }
    });

    useEffect(() => {
        async function deleteListAttribute() {
            try {
                if (attributeStateIdList.length>0) {
                    deleteAttributeList();
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        deleteListAttribute()
        return () => {

        }
    }, [attributeStateIdList])

    useEffect(() => {
        async function deleteListAttribute() {
            try {
                if (attributeStateIdList.length>0) {
                    deleteAttributeList();
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        deleteListAttribute()
        return () => {

        }
    }, [attributeStateIdList])

    async function handleSubmit(e) {
        e.preventDefault()
        if (woocommerce.hasAttributes()) {
            const data = await getAttributeList();
            setAttributeStateIdList(data.data.woocommerceAttributes.map(attribute => ({"id":attribute.id})))
        }
    }

    return (
        <form>
            <button type="submit" onClick={handleSubmit} className="py-3 mt-4 btn btn-lg btn-success btn-block">
                Delete Attributes
            </button>
        </form>
    )
}