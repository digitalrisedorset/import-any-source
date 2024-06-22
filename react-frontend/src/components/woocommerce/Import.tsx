import ImportProduct from "./MainMappingArea/ImportProduct";
import ImportWoocommerceAttribute from "./MainMappingArea/ImportWoocommerceAttribute";
import ImportMagentoAttribute from "../magento/ImportMagentoAttribute";
import {ImportHome} from '../styles/MappingScreen';
import {MonitorUpdate} from "./MonitorUpdate";

export function Import(): JSX.Element {
    return (
        <ImportHome>
            <div className="steps">
                <ImportWoocommerceAttribute />
                <ImportMagentoAttribute />
                <ImportProduct />
            </div>
            <MonitorUpdate />
        </ImportHome>
    )
}