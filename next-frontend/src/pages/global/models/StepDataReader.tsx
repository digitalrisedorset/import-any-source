import {ImportCatalogSourceAttribute} from "../../catalog-source/components/MainMappingArea/ImportCatalogSourceAttribute";
import {ImportMagentoAttribute} from "../../magento/components/ImportMagentoAttribute";
import {MappingAttributes} from "../../mapping/components/MappingAttribute";
import {ImportProduct} from "../../catalog-source/components/MainMappingArea/ImportProduct";
import {useAccess} from "@/pages/user-authentication/hooks/useAccess";
import {StepData} from "../../catalog-source/types/step";
import {GetCatalogSourceMappedAttribute} from "../../catalog-source/components/MainMappingArea/GetCatalogSourceMappedAttribute";
import {GetMagentoMappedAttribute} from "../../magento/components/GetMagentoMappedAttribute";
import {Monitor} from "@/pages/catalog-source/components/Monitor";

export class StepDataReader {
    getImportStep = () => {
        const  {canImportSourceAttribute, canImportMagentoAttribute, canMapAttribute, canImportProduct, canMonitorData} = useAccess()

        const stepData: StepData = []

        if (canImportSourceAttribute) {
            stepData.push({
                step: "Step 1",
                component: <>
                    <ImportCatalogSourceAttribute/>
                    <GetCatalogSourceMappedAttribute />
                    </>
            })
        }

        if (canImportMagentoAttribute) {
            stepData.push({
                step: "Step 2",
                component: <>
                    <ImportMagentoAttribute/>
                    <GetMagentoMappedAttribute />
                </>
            })
        }

        if (canMapAttribute) {
            stepData.push({
                step: "Step 3",
                component: <MappingAttributes/>
            })
        }

        if (canImportProduct) {
            stepData.push({
                step: "Step 4",
                component: <ImportProduct/>
            })
        }

        if (canMonitorData) {
            stepData.push({
                step: "Step 5",
                component: <Monitor />
            })
        }

        return stepData
    }
}