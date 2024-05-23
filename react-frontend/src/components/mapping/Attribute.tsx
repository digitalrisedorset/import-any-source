import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ItemStyles from './../styles/ItemStyles';
import Title from './../styles/Title';
import {LazyQueryResultTuple, OperationVariables, QueryResult, useLazyQuery, useMutation} from "@apollo/client";
import {
    UPDATE_ATTRIBUTE_MUTATION,
    GET_MAGENTO_ATTRIBUTE_LIST_QUERY,
    GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY, ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY
} from "../../graphql/keystone";

import {
    MagentoAttribute,
    WoocommerceAttribute,
    MatchingAttributeData
} from "../../types/keystone";
import {useActions} from "../../hooks/useActions";

interface MappingProps {
    attribute: MatchingAttributeData,
    initialAttribute: string
}

interface WoocommerceQueryResult extends QueryResult {
    woocommerceAttributes: WoocommerceAttribute[]
}

interface MagentoQueryResult extends QueryResult {
    magentoAttributes: MagentoAttribute[]
}

export function Attribute({attribute, initialAttribute}: MappingProps): JSX.Element {
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const [woocommerceAttributeStateId, setWoocommerceAttributeStateId] = useState('');
    const [magentoAttributeStateId, setMagentoAttributeStateId] = useState('');

    const [mapAttribute] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":woocommerceAttributeStateId},
            "data": {
                "magentoCode": {
                    "connect": {"id":magentoAttributeStateId}
                }
            }
        },
        refetchQueries: [
            {
                query: ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY,
                variables: {}
            }
        ]
    });
    const [getWoocommerceAttributeList]: LazyQueryResultTuple<WoocommerceQueryResult, OperationVariables> = useLazyQuery(GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": initialAttribute
                }
            }
        }
    });
    const [getMagentoAttributeList]: LazyQueryResultTuple<MagentoQueryResult, OperationVariables> = useLazyQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": attribute.value
                }
            }
        }
    });

    useEffect(() => {
        async function linkAttribute() {
            try {
                if (woocommerceAttributeStateId!='' && magentoAttributeStateId!='') {
                    mapAttribute();
                    addFlashMessage(`${initialAttribute} is mapped to ${attribute.label}`)
                    navigate(`/woocommerce/${initialAttribute}/${attribute.label}`);
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        linkAttribute()
        return () => {

        }
    }, [woocommerceAttributeStateId && magentoAttributeStateId])

    async function mapField(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        try {
            const data1 = await getWoocommerceAttributeList();
            const data2 = await getMagentoAttributeList();
            if (data1?.data?.woocommerceAttributes[0].id && data2?.data?.magentoAttributes[0].id) {
                setWoocommerceAttributeStateId(data1.data.woocommerceAttributes[0].id)
                setMagentoAttributeStateId(data2.data.magentoAttributes[0].id)
            }
        } catch (e) {
            console.log('error');
        }
    }

    return (
        <ItemStyles>
            <Title>
                <span key={attribute.value} className="list-group-item list-group-item-action">
                    <strong>{attribute.label}</strong>{" "}
                </span>
            </Title>
            <span>code: {attribute.value}</span>
            <button type="button" onClick={mapField}>Map</button>
        </ItemStyles>
    )
}