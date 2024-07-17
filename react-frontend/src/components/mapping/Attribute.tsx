import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ItemStyles from './../styles/ItemStyles';
import { Title } from '../styles/Title';
import {
    LazyQueryResultTuple,
    OperationVariables,
    QueryResult,
    useLazyQuery,
    useMutation
} from "@apollo/client";
import {
    UPDATE_ATTRIBUTE_MUTATION,
    GET_MAGENTO_ATTRIBUTE_LIST_QUERY,
    GET_PIM_ATTRIBUTE_LIST_QUERY,
    ALL_PIM_PRODUCT_ATTRIBUTES_QUERY,
    GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY
} from "../../graphql/keystone";

import {
    MagentoAttribute,
    PimQueryResult,
    MatchingAttributeData
} from "../../types/keystone";
import {useActions} from "../../hooks/useActions";

interface MappingProps {
    attribute: MatchingAttributeData,
    initialAttribute: string
}

interface MagentoQueryResult extends QueryResult {
    magentoAttributes: MagentoAttribute[]
}

export function Attribute({attribute, initialAttribute}: MappingProps) {
    const { addFlashMessage } = useActions()
    const navigate = useNavigate()
    const [pimAttributeStateId, setPimAttributeStateId] = useState('');
    const [magentoAttributeStateId, setMagentoAttributeStateId] = useState('');

    const [mapAttribute] = useMutation(UPDATE_ATTRIBUTE_MUTATION, {
        variables: {
            "where": {"id":pimAttributeStateId},
            "data": {
                "magentoCode": {
                    "connect": {"id":magentoAttributeStateId}
                }
            }
        },
        refetchQueries: [{query: GET_MAPPING_STATUS_ATTRIBUTE_LIST_QUERY}, {query: ALL_PIM_PRODUCT_ATTRIBUTES_QUERY}],
        update
    });
    const [getPimAttributeList]: LazyQueryResultTuple<PimQueryResult, OperationVariables> = useLazyQuery(GET_PIM_ATTRIBUTE_LIST_QUERY, {
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
                    "equals": attribute.label
                }
            }
        }
    });

    function update(cache: any, payload: any) {
        cache.evict(cache.identify(payload.data.updatePimAttribute));
    }

    const isMappingReady = () => {
        return pimAttributeStateId && magentoAttributeStateId
    }

    useEffect(() => {
        async function linkAttribute() {
            try {
                if (pimAttributeStateId!=='' && magentoAttributeStateId!=='') {
                    mapAttribute();
                    addFlashMessage(`${initialAttribute} is mapped to ${attribute.label}`)
                    navigate(`/pim/${initialAttribute}/${attribute.label}`);
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        linkAttribute()
        return () => {

        }
    }, [isMappingReady()])

    const mapField = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const data1 = await getPimAttributeList();
            const data2 = await getMagentoAttributeList();
            if (data1?.data?.pimAttributes[0].id && data2?.data?.magentoAttributes[0].id) {
                setPimAttributeStateId(data1.data.pimAttributes[0].id)
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