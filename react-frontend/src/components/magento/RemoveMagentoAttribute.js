import { useEffect, useState, useContext } from "react"
import { useMutation, useLazyQuery } from '@apollo/client';
import {DELETE_MAGENTO_ATTRIBUTE_LIST_MUTATION, GET_MAGENTO_ATTRIBUTE_LIST_QUERY} from '../../graphql/keystoneQuery'
import StateContext from "../../StateContext";
import {magentoModel} from "../../models/MagentoData";

export default function RemoveMagentoAttribute() {
    const appState = useContext(StateContext)
    const magento = magentoModel(appState)
    const [attributeStateIdList, setAttributeStateIdList] = useState([]);
    const [getAttributeList, { loading, attributes }] = useLazyQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "in": attributeStateIdList
                }
            }
        }
    });

    const [deleteAttributeList] = useMutation(DELETE_MAGENTO_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            "where": attributeStateIdList
        }
    });

    useEffect(() => {
        async function deleteListAttribute() {
            try {
                if (attributeStateIdList.length>0) {
                    //deleteAttributeList();
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
        if (magento.hasMagentoAttributes()) {
            const data = await getAttributeList();
            setAttributeStateIdList(data.data.magentoAttributes.map(attribute => ({"id":attribute.id})))
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