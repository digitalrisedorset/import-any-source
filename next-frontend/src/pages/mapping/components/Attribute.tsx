import React, { useEffect, useState } from "react"
import {ItemStyles} from '../../global/styles/ItemStyles';
import {Title} from '../../global/styles/Title';
import {MatchingAttributeData} from "../../types/keystone";
import {useMapAttribute} from "../graphql/useMapAttribute";
import {useFindCatalogSourceAttributes} from "../../catalog-source/graphql/useFindCatalogSourceAttributes";
import {useFindMagentoAttributes} from "../../magento/graphql/keystone/useFindMagentoAttributes";
import {useActiveCatalogSource} from "../../catalog-source/hooks/useCurrentCatalogSource";
import {useAppSelector} from "@/state/store";

interface MappingProps {
    attribute: MatchingAttributeData,
    initialAttribute: string
}

export const Attribute: React.FC<MappingProps> = ({attribute, initialAttribute}: MappingProps) => {
    const currentCatalogSource = useActiveCatalogSource()
    const { addFlashMessage } = useAppSelector((state) => state.flashMessage)
    const { addCatalogSourceAttributeMapped } = useAppSelector((state) => state.catalogSourceAttribute)
    const router = useRouter()
    const [catalogSourceAttributeStateId, setCatalogSourceAttributeStateId] = useState<string>('');
    const [magentoAttributeStateId, setMagentoAttributeStateId] = useState<string>('');
    const mapAttribute = useMapAttribute(catalogSourceAttributeStateId, magentoAttributeStateId)
    const getCatalogSourceAttributeList = useFindCatalogSourceAttributes(initialAttribute)
    const getMagentoAttributeList = useFindMagentoAttributes(attribute.label)

    const isMappingReady = () => {
        return catalogSourceAttributeStateId && magentoAttributeStateId
    }

    useEffect(() => {
        function linkAttribute() {
            try {
                if (catalogSourceAttributeStateId!=='' && magentoAttributeStateId!=='') {
                    mapAttribute();
                    router.push({pathname: `/catalog-source/${initialAttribute}/${attribute.label}`});
                    addCatalogSourceAttributeMapped(currentCatalogSource.name)
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
            const data1 = await getCatalogSourceAttributeList();
            const data2 = await getMagentoAttributeList();
            if (data1?.data?.catalogSourceAttributes[0].id && data2?.data?.magentoAttributes[0].id) {
                setCatalogSourceAttributeStateId(data1.data.catalogSourceAttributes[0].id)
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