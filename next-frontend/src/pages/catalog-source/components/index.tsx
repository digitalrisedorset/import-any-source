import { GetCatalogSourceAttribute } from "./MainMappingArea/GetCatalogSourceAttribute";
import { MappingScreen } from '../../global/styles/MappingScreen';
import { GetIgnoredAttribute } from "./IgnoreFieldArea/GetIgnoredAttribute";
import {useActions} from "@/pages/global/hooks/useActions";

export const CatalogSource: React.FC = () => {
    const { initialAttribute, matchingAttribute } = [null, null]//useParams();
    const { addFlashMessage } = useActions();

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