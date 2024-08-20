import { GetCatalogSourceAttribute } from "./MainMappingArea/GetCatalogSourceAttribute";
import { useActions } from "../../global/hooks/useActions";
import { useParams } from "react-router-dom";
import { MappingScreen } from '../../global/styles/MappingScreen';
import { GetIgnoredAttribute } from "./IgnoreFieldArea/GetIgnoredAttribute";

export const CatalogSource: React.FC = () => {
    const { initialAttribute, matchingAttribute } = useParams();
    const { addFlashMessage } = useActions()

    if (initialAttribute && matchingAttribute) {
        addFlashMessage(`The catalog attribute "${initialAttribute}" is matched with the magento attribute "${matchingAttribute}"`)
    }

    return (
        <MappingScreen>
            <div className="fields">
                <GetCatalogSourceAttribute />
            </div>
            <GetIgnoredAttribute />
        </MappingScreen>
    )
}