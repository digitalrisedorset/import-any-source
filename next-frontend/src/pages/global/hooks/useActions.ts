import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserAccess, setActiveTheme } from "@/state/configurationSlice"
import {addFlashMessage, addDownloadMessage, clearFlashMessage} from "@/state/flashMessageSlice"
import {setCatalogSourceAttributesImported, addCatalogSourceAttributeIgnored, addCatalogSourceAttributeActivated} from "@/state/catalogSourceAttributeSlice"
import {setMagentoAttributesImported} from "@/state/magentoAttributeSlice"
import {setCatalogSourceAttributesMatchFound, setCatalogSourceAttributesMatchSet} from "@/state/catalogSourceMappingSlice";
import {setProductMonitoredAction, setCatalogSourceProductBatchLoaded, setCatalogSourceProductBatchValidated,
    setCatalogSourceProductRemoved, setCatalogSourceProductUpdateNotification, setCatalogSourceProductDeleteNotification
} from "@/state/catalogSourceProductSlice"

const actionCreators = {
    setUserAccess, setActiveTheme,
    addFlashMessage,
    addDownloadMessage,
    clearFlashMessage,
    setCatalogSourceAttributesImported,
    setMagentoAttributesImported,
    setCatalogSourceAttributesMatchFound,
    setCatalogSourceAttributesMatchSet,
    setProductMonitoredAction,
    setCatalogSourceProductBatchLoaded,
    setCatalogSourceProductBatchValidated,
    setCatalogSourceProductRemoved,
    setCatalogSourceProductUpdateNotification,
    setCatalogSourceProductDeleteNotification,
    addCatalogSourceAttributeIgnored,
    addCatalogSourceAttributeActivated
}

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()

    return bindActionCreators(actionCreators, dispatch)
}