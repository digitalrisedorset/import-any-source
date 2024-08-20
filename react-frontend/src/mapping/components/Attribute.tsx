import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import {ItemStyles} from '../../global/styles/ItemStyles';
import {Title} from '../../global/styles/Title';
import {MatchingAttributeData} from "../../types/keystone";
import {useActions} from "../../global/hooks/useActions";
import {useMapAttribute} from "../graphql/useMapAttribute";
import {useFindPimAttributes} from "../../pim/graphql/useFindPimAttributes";
import {useFindMagentoAttributes} from "../../magento/graphql/keystone/useFindMagentoAttributes";
import {useActivePimSystem} from "../../pim/hooks/useCurrentPimSystem";

interface MappingProps {
    attribute: MatchingAttributeData,
    initialAttribute: string
}

export const Attribute: React.FC<MappingProps> = ({attribute, initialAttribute}: MappingProps) => {
    const currentPimSystem = useActivePimSystem()
    const { addFlashMessage, addPimAttributeMapped } = useActions()
    const navigate = useNavigate()
    const [pimAttributeStateId, setPimAttributeStateId] = useState<string>('');
    const [magentoAttributeStateId, setMagentoAttributeStateId] = useState<string>('');
    const mapAttribute = useMapAttribute(pimAttributeStateId, magentoAttributeStateId)
    const getPimAttributeList = useFindPimAttributes(initialAttribute)
    const getMagentoAttributeList = useFindMagentoAttributes(attribute.label)

    const isMappingReady = () => {
        return pimAttributeStateId && magentoAttributeStateId
    }

    useEffect(() => {
        function linkAttribute() {
            try {
                if (pimAttributeStateId!=='' && magentoAttributeStateId!=='') {
                    mapAttribute();
                    navigate(`/pim/${initialAttribute}/${attribute.label}`);
                    addPimAttributeMapped(currentPimSystem.name)
                    addFlashMessage(`${initialAttribute} is mapped to ${attribute.label}`)
                }
            } catch (e) {
                console.log("There was a problem.")
            }
        }
        linkAttribute()
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