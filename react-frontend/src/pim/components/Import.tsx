import {ImportPimAttribute} from "./MainMappingArea/ImportPimAttribute";
import {ImportMagentoAttribute} from "../../magento/components/ImportMagentoAttribute";
import {ImportHome} from '../../styles/MappingScreen';
import {MonitorUpdate} from "./MonitorUpdate";
import {ImportProduct} from "./MainMappingArea/ImportProduct";
import {MappingAttributes } from './MappingAttribute'
import {useAccess} from "../../configuration/hooks/useAccess";

export const Import = () => {
    const  {canImportPIMAttribute, canImportMagentoAttribute, canMapAttribute, canImportProduct, canSetupImport} = useAccess()

    return (
        <ImportHome>
            {canSetupImport &&
            <div className="steps">
                {canImportPIMAttribute && <ImportPimAttribute />}
                {canImportMagentoAttribute && <ImportMagentoAttribute />}
                {canMapAttribute && <MappingAttributes />}
                {canImportProduct &&<ImportProduct />}
            </div>}
            <MonitorUpdate />
        </ImportHome>
    )
}