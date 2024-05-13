import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ItemStyles from './../styles/ItemStyles';
import Title from './../styles/Title';
import {QueryResult, useLazyQuery, useMutation} from "@apollo/client";
import {
    UPDATE_ATTRIBUTE_MUTATION,
    GET_MAGENTO_ATTRIBUTE_LIST_QUERY,
    GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY
} from "../../graphql/keystone";
import { useActions } from "../../hooks/useActions";

import { MagentoAttribute, WoocommerceAttribute, MatchingAttributeData } from "../../types";
import {setWoocommerceAttributesMatchSet} from "../../state/action-creators";

interface MappingProps {
    attribute: MatchingAttributeData,
    initialAttribute: string
}

interface WoocommerceQueryResult extends QueryResult {
    data: {
        woocommerceAttributes: WoocommerceAttribute[]
    }
}

interface MagentoQueryResult extends QueryResult {
    data: {
        magentoAttributes: MagentoAttribute[]
    }
}

export function Attribute({attribute, initialAttribute}: MappingProps) {
    const navigate = useNavigate()
    const { addFlashMessage } = useActions()
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
        }
    });
    const [getWoocommerceAttributeList, woocommerceVariables] = useLazyQuery(GET_WOOCOMMERCE_ATTRIBUTE_LIST_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": initialAttribute
                }
            }
        }
    });
    const [getMagentoAttributeList, magentoVariables] = useLazyQuery(GET_MAGENTO_ATTRIBUTE_LIST_QUERY, {
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
                    //setWoocommerceAttributesMatchSet(data1.data.woocommerceAttributes[0], data2.data.magentoAttributes[0])
                    //appDispatch({ type: "flashMessage", value: `${initialAttribute} is mapped to ${attribute.code}`})
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
            const data1: WoocommerceQueryResult = await getWoocommerceAttributeList();
            const data2: MagentoQueryResult = await getMagentoAttributeList();
            if (data1.data.woocommerceAttributes[0].id && data2.data.magentoAttributes[0].id) {
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