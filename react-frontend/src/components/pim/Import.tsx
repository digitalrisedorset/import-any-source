import {ImportPimAttribute} from "./MainMappingArea/ImportPimAttribute";
import {ImportMagentoAttribute} from "../magento/ImportMagentoAttribute";
import {ImportHome} from '../styles/MappingScreen';
import {MonitorUpdate} from "./MonitorUpdate";
import {ImportProduct} from "./MainMappingArea/ImportProduct";
import {MappingAttributes } from './MappingAttribute'

export const Import = () => {
    return (
        <ImportHome>
            <div className="steps">
                <ImportPimAttribute />
                <ImportMagentoAttribute />
                <MappingAttributes />
                <ImportProduct />
            </div>
            <MonitorUpdate />
        </ImportHome>
    )
}