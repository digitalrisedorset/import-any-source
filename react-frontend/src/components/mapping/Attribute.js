import { useEffect, useState, useContext } from "react"
import ItemStyles from './../styles/ItemStyles';
import Title from './../styles/Title';
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
    UPDATE_ATTRIBUTE_MUTATION,
    GET_MAGENTO_ATTRIBUTE_LIST_QUERY,
    DELETE_MAGENTO_ATTRIBUTE_LIST_MUTATION
} from "../../graphql/keystoneQuery";
import {  GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY} from "../../graphql/keystoneQuery";
import DispatchContext from "../../DispatchContext";
export default function Attribute({attribute, initialAttribute}) {
    const appDispatch = useContext(DispatchContext)
    const [woocommerceAttributeStateId, setWoocommerceAttributeStateId] = useState([]);
    const [magentoAttributeStateId, setMagentoAttributeStateId] = useState([]);

    const [mapAttribute] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":woocommerceAttributeStateId},
            "data": {
                "magentoCode": {
                    "connect": {"id":magentoAttributeStateId}
                }
            }
        }
    });
    const [getWoocommerceAttributeList, { loading1, woocommerceAttributes }] = useLazyQuery(GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": initialAttribute
                }
            }
        }
    });
    const [getMagentoAttributeList, { loading2, magentoAttributes }] = useLazyQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": attribute.code
                }
            }
        }
    });

    useEffect(() => {
        async function linkAttribute() {
            try {
                if (woocommerceAttributeStateId!='' && magentoAttributeStateId!='') {
                    mapAttribute();
                    appDispatch({ type: "flashMessage", value: `${initialAttribute} is mapped to ${attribute.code}`})
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        linkAttribute()
        return () => {

        }
    }, [woocommerceAttributeStateId && magentoAttributeStateId])

    async function mapField(e) {
        e.preventDefault();
        try {
            const data1 = await getWoocommerceAttributeList();
            setWoocommerceAttributeStateId(data1.data.woocommerceAttributes[0].id)
            const data2 = await getMagentoAttributeList();
            setMagentoAttributeStateId(data2.data.magentoAttributes[0].id)
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <ItemStyles>
            <Title>
                <span key={attribute.code} className="list-group-item list-group-item-action">
                    <strong>{attribute.name}</strong>{" "}
                </span>
            </Title>
            <span>code: {attribute.code}</span>
            <button type="button" onClick={mapField}>
                Map{loading1 && 'ing'}
            </button>
        </ItemStyles>
    )
}