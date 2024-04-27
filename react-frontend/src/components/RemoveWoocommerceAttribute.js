import { useEffect, useState } from "react"
import Axios from "axios";
import {gql, useMutation, useLazyQuery} from '@apollo/client';

const GET_ATTRIBUTE_LIST_QUERY = gql`    
    query WoocommerceAttributes($where: WoocommerceAttributeWhereInput!) {
      woocommerceAttributes(where: $where) {
        id
      }
    }
`;

const DELETE_ATTRIBUTE_LIST_MUTATION = gql`    
    mutation DeleteWoocommerceAttributes($where: [WoocommerceAttributeWhereUniqueInput!]!) {
      deleteWoocommerceAttributes(where: $where) {
        id
      }
    }
`;

export default function RemoveWoocommerceAttribute() {
    const [attributeListState, setAttributeListState] = useState([]);
    const [attributeStateCodeList, setAttributeStateCodeList] = useState([]);
    const [attributeStateIdList, setAttributeStateIdList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [getAttributeList, { loading, attributes }] = useLazyQuery(GET_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "in": attributeStateCodeList
                }
            }
        }
    });

    const [deleteAttributeList] = useMutation(DELETE_ATTRIBUTE_LIST_MUTATION, {
        variables: {
            "where": attributeStateIdList
        }
    });

    useEffect(() => {
        async function getListAttribute() {
            try {
              if (attributeListState.length>0) {
                setAttributeStateCodeList(attributeListState.map(attribute => (attribute.code)))
              }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        getListAttribute()
        return () => {

        }
    }, [attributeListState])

    useEffect(() => {
        async function deleteListAttribute() {
            try {
                if (attributeStateCodeList.length>0) {
                    const data = await getAttributeList();
                    setAttributeStateIdList(data.data.woocommerceAttributes.map(attribute => ({"id":attribute.id})))
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        deleteListAttribute()
        return () => {

        }
    }, [attributeStateCodeList])

    useEffect(() => {
        async function deleteListAttribute() {
            try {
                if (attributeStateIdList.length>0) {
                    deleteAttributeList();
                    setIsLoading(false);
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
        e.preventDefault();
        try {
            const ourRequest = Axios.CancelToken.source()
            const res = await Axios.get('http://localhost:8080/getWoocommerceAttributeList', { cancelToken: ourRequest.token });
            let list = []
            // eslint-disable-next-line array-callback-return
            {res.data.map(attribute => {
                list.push({
                    code: attribute.code,
                    name: attribute.name,
                    type: (attribute.type==='options')?'select':'text',
                    required: false
                })
            })}
            setAttributeListState(list)
            ourRequest.cancel()
        } catch (e) {
            console.log('error');
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