import ImportWoocommerceAttribute from "./MainMappingArea/ImportWoocommerceAttribute";
import ImportMagentoAttribute from "../magento/ImportMagentoAttribute";
import {ImportHome} from '../styles/MappingScreen';
import {MonitorUpdate} from "./MonitorUpdate";
import {OperationVariables, QueryResult, useQuery} from "@apollo/client";
import {
    ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY,
    ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY,
    ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY
} from "../../graphql/keystone";
import {
    KeystoneMagentoAttributeData,
    WoocommerceAttributeData,
    WoocommerceQueryResult,
    KeystoneWoocommerceAttributeData
} from "../../types/keystone";
import ImportProduct from "./MainMappingArea/ImportProduct";
import {MappingAttributes } from './MappingAttribute'
import {useEffect, useState} from "react";
import {AllSteps, APP_STATE} from "../../types/states";

export function Import() {
    const woocommerceAttributeData: QueryResult<KeystoneWoocommerceAttributeData | OperationVariables> = useQuery(ALL_WOOCOMMERCE_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {},
    });

    const magentoAttributeData: QueryResult<KeystoneMagentoAttributeData | OperationVariables> = useQuery(ALL_MAGENTO_PRODUCT_ATTRIBUTES_QUERY, {
        variables: {}
    });

    const mappingData: QueryResult<WoocommerceQueryResult | OperationVariables> = useQuery(ALL_WOOCOMMERCE_ATTRIBUTES_NOT_MAPPED_QUERY, {
        variables: {
            "where": {
                "ignored": {
                    "equals": false
                },
                "magentoCode": null
            }
        }
    });

    useEffect(() => {
        async function setCurrentStep() {
            let remainingStep = AllSteps
            let completedStep: any[] = []
            if (woocommerceAttributeData?.data?.woocommerceAttributes?.length>0) {
                completedStep.push(APP_STATE.woocommerceComplete)
            }
            if (magentoAttributeData?.data?.magentoAttributes?.length>0) {
                completedStep.push(APP_STATE.magentoComplete)
            }
            if (mappingData?.data?.woocommerceAttributes?.length>0) {
                completedStep.push(APP_STATE.mappingComplete)
            }
            const steps = remainingStep.filter((step: APP_STATE) => completedStep.indexOf(step) === -1)
            // console.log('completedStep', completedStep)
            // console.log('setRemainingSteps', steps)
            //setRemainingSteps(steps)
        }
        setCurrentStep()
        return () => {

        }
    }, [woocommerceAttributeData?.data?.woocommerceAttributes.length
            || magentoAttributeData?.data?.magentoAttributes.length
            || mappingData?.data?.woocommerceAttributes.length])

    return (
        <ImportHome>
            <div className="steps">
                <ImportWoocommerceAttribute data={woocommerceAttributeData.data as WoocommerceAttributeData} />
                <ImportMagentoAttribute data={magentoAttributeData.data as KeystoneMagentoAttributeData}/>
                <MappingAttributes data={mappingData.data as WoocommerceAttributeData} />
                <ImportProduct data={mappingData.data as WoocommerceAttributeData} />
            </div>
            <MonitorUpdate />
        </ImportHome>
    )
}