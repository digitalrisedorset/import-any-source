import {MagentoAttributesActionType} from "../action-types/MagentoAttributesAction";

interface SetAttributeImportAction {
    type: MagentoAttributesActionType.SET_MAGENTO_ATTRIBUTES_IMPORT,
    magentoAttributes: number
}

export type SetMagentoAttributeActionList = SetAttributeImportAction