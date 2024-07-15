import ImportWoocommerceAttribute from "./MainMappingArea/ImportWoocommerceAttribute";
import ImportMagentoAttribute from "../magento/ImportMagentoAttribute";
import {ImportHome} from '../styles/MappingScreen';
import {MonitorUpdate} from "./MonitorUpdate";
import ImportProduct from "./MainMappingArea/ImportProduct";
import {MappingAttributes } from './MappingAttribute'

export function Import() {
    return (
        <ImportHome>
            <div className="steps">
                <ImportWoocommerceAttribute />
                <ImportMagentoAttribute />
                <MappingAttributes />
                <ImportProduct />
            </div>
            <MonitorUpdate />
        </ImportHome>
    )
}