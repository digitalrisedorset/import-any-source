import { GetCatalogSourceAttribute } from "./MainMappingArea/GetCatalogSourceAttribute";
import { MappingScreen } from '../../global/styles/MappingScreen';
import { GetIgnoredAttribute } from "./IgnoreFieldArea/GetIgnoredAttribute";
import {useFlashMessage} from "@/state/flassMessageState";
import {useCatalogSourceAttributes} from "@/pages/catalog-source/graphql/useCatalogSourceAttributes";
import React from "react";
import {LoadingDotsIcon} from "@/pages/global/components/Loading";

export const CatalogSource: React.FC = () => {
    const { initialAttribute, matchingAttribute } = [null, null]
    const { addFlashMessage } = useFlashMessage()
    const { data, error, loading } = useCatalogSourceAttributes()

    if (initialAttribute && matchingAttribute) {
        addFlashMessage(`The catalog attribute "${initialAttribute}" is matched with the magento attribute "${matchingAttribute}"`)
    }

    if (loading) return <LoadingDotsIcon />

    return (
        <MappingScreen>
            {error && <h3>{error.message}</h3>}
            <div className="fields">
                <GetCatalogSourceAttribute />
            </div>
            <GetIgnoredAttribute catalogSourceAttributes={data?.catalogSourceAttributes} />
        </MappingScreen>
    )
}