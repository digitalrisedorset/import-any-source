import {ImportPimAttribute} from "../../pim/components/MainMappingArea/ImportPimAttribute";
import {ImportMagentoAttribute} from "../../magento/components/ImportMagentoAttribute";
import {MappingAttributes} from "../../pim/components/MappingAttribute";
import {ImportProduct} from "../../pim/components/MainMappingArea/ImportProduct";
import {useAccess} from "../../configuration/hooks/useAccess";
import {StepData} from "../../pim/types/step";
import {MonitorUpdate} from "../../pim/components/MonitorUpdate";
import {GetPimMappedAttribute} from "../../pim/components/MainMappingArea/GetPimMappedAttribute";
import {GetMagentoMappedAttribute} from "../../magento/components/GetMagentoMappedAttribute";

export class StepDataReader {
    getImportStep = () => {
        const  {canImportPIMAttribute, canImportMagentoAttribute, canMapAttribute, canImportProduct, canSetupImport} = useAccess()

        const stepData: StepData = []

        if (canImportPIMAttribute) {
            stepData.push({
                step: "Step 1",
                component: <>
                    <ImportPimAttribute/>
                    <GetPimMappedAttribute />
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

        stepData.push({
            step: "Step 5",
            component: <MonitorUpdate/>
        })

        return stepData
    }
}