import { GetPimAttribute } from "./MainMappingArea/GetPimAttribute";
import { useActions } from "../../global/hooks/useActions";
import { useParams } from "react-router-dom";
import { MappingScreen } from '../../styles/MappingScreen';
import { GetIgnoredAttribute } from "./IgnoreFieldArea/GetIgnoredAttribute";

export const Pim = () => {
    const { initialAttribute, matchingAttribute } = useParams();
    const { addFlashMessage } = useActions()

    if (initialAttribute && matchingAttribute) {
        addFlashMessage(`The pim attribute "${initialAttribute}" is matched with the magento attribute "${matchingAttribute}"`)
    }

    return (
        <MappingScreen>
            <div className="fields">
                <GetPimAttribute />
            </div>
            <GetIgnoredAttribute />
        </MappingScreen>
    )
}