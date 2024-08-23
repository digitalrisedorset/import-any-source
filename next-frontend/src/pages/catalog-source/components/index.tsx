import { GetCatalogSourceAttribute } from "./MainMappingArea/GetCatalogSourceAttribute";
import { useParams } from "react-router-dom";
import { MappingScreen } from '../../global/styles/MappingScreen';
import { GetIgnoredAttribute } from "./IgnoreFieldArea/GetIgnoredAttribute";
import {useAppSelector} from "@/state/store";

export const CatalogSource: React.FC = () => {
    const { initialAttribute, matchingAttribute } = useParams();
    const { addFlashMessage } = useAppSelector((state) => state.flashMessage);

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