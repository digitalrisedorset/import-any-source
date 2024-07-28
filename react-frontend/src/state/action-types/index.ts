export enum PimAttributesMappingActionType {
    PIM_ATTRIBUTES_MATCH_SEARCH_COMPLETE = 'pim_attributes_match_search_complete',
    PIM_ATTRIBUTES_MAPPING_SET = 'pim_attributes_mapping_set',
    PIM_ATTRIBUTES_MAPPING_ERROR = 'pim_attributes_mapping_error'
}

export enum FlashMessageActionType {
    ADD_FLASH_MESSAGE = 'add_flash_message',
    ADD_DOWNLOAD_MESSAGE = 'add_download_message',
}

export enum ConfigActionType {
    SET_THEME_PREFERENCE = 'set_active_theme',
}

export enum PimAttributesActionType {
    SET_PIM_ATTRIBUTES_IMPORT = 'set_pim_attributes_import',
    SET_PIM_ATTRIBUTES_ACTIVE = 'set_pim_attributes_active',
    SET_PIM_ATTRIBUTE_MAPPED = 'set_pim_attribute_mapped',
    SET_PIM_ATTRIBUTE_IGNORED = 'set_pim_attribute_ignored',
    SET_PIM_ATTRIBUTE_ACTIVATED = 'set_pim_attribute_activated'
}

export enum MagentoAttributesActionType {
    SET_MAGENTO_ATTRIBUTES_IMPORT = 'set_magento_attributes_import',
}

export enum UserActionType {
    SET_USER_LOGIN = 'set_user_login',
}