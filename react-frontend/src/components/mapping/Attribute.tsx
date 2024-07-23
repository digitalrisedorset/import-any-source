import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import ItemStyles from './../styles/ItemStyles';
import {Title} from '../styles/Title';
import {MatchingAttributeData} from "../../types/keystone";
import {useActions} from "../../hooks/useActions";
import {useMapAttribute} from "../../graphql/keystone/useMapAttribute";
import {useFindPimAttributes} from "../../graphql/keystone/useFindPimAttributes";
import {useFindMagentoAttributes} from "../../graphql/keystone/useFindMagentoAttributes";
import {useActivePimSystem} from "../../hooks/useCurrentPimSystem";

interface MappingProps {
    attribute: MatchingAttributeData,
    initialAttribute: string
}

export const Attribute = ({attribute, initialAttribute}: MappingProps) => {
    const currentPimSystem = useActivePimSystem()
    const { addFlashMessage, addPimAttributeMapped } = useActions()
    const navigate = useNavigate()
    const [pimAttributeStateId, setPimAttributeStateId] = useState('');
    const [magentoAttributeStateId, setMagentoAttributeStateId] = useState('');
    const mapAttribute = useMapAttribute(pimAttributeStateId, magentoAttributeStateId)
    const getPimAttributeList = useFindPimAttributes(initialAttribute)
    const getMagentoAttributeList = useFindMagentoAttributes(attribute.label)

    const isMappingReady = () => {
        return pimAttributeStateId && magentoAttributeStateId
    }

    useEffect(() => {
        async function linkAttribute() {
            try {
                if (pimAttributeStateId!=='' && magentoAttributeStateId!=='') {
                    mapAttribute();
                    addPimAttributeMapped(currentPimSystem.name)
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