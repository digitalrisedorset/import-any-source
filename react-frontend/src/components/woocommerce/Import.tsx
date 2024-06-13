import ImportProduct from "./MainMappingArea/ImportProduct";
import ImportWoocommerceAttribute from "./MainMappingArea/ImportWoocommerceAttribute";
import ImportMagentoAttribute from "../magento/ImportMagentoAttribute";

export function Import(): JSX.Element {
    return (
        <>
            <ImportProduct />
            <ImportWoocommerceAttribute />
            <ImportMagentoAttribute />
        </>
    )
}