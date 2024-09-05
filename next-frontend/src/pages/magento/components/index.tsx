import {ReadMagentoAttribute} from "./ReadMagentoAttribute";
import React from "react";
import {useMagentoAttributes} from "@/pages/magento/graphql/keystone/useMagentoAttributes";
import {LoadingDotsIcon} from "@/pages/global/components/Loading";

export const Magento: React.FC = () => {
    const { data, error, loading } = useMagentoAttributes()

    if (loading) return <LoadingDotsIcon />

    return (
        <ReadMagentoAttribute magentoAttributes={data?.magentoAttributes} />
    )
}