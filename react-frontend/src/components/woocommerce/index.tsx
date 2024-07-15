import { GetWoocommerceAttribute } from "./MainMappingArea/GetWoocommerceAttribute";
import { useActions } from "../../hooks/useActions";
import { useParams } from "react-router-dom";
import { MappingScreen } from '../styles/MappingScreen';
import { GetIgnoredAttribute } from "./IgnoreFieldArea/GetIgnoredAttribute";

export function Woocommerce() {
    const { initialAttribute, matchingAttribute } = useParams();
    const { addFlashMessage } = useActions()

    if (initialAttribute && matchingAttribute) {
        addFlashMessage(`The woocommerce attribute "${initialAttribute}" is matched with the magento attribute "${matchingAttribute}"`)
    }

    return (
        <MappingScreen>
            <div className="fields">
                <GetWoocommerceAttribute />
            </div>
            <GetIgnoredAttribute />
        </MappingScreen>
    )
}