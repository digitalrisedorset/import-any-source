export enum PimAttributesLoadActionType {
    PIM_ATTRIBUTES_LOAD = 'pim_attributes_load',
    PIM_ATTRIBUTES_LOAD_SUCCESS = 'pim_attributes_load_success',
    PIM_ATTRIBUTES_LOAD_ERROR = 'pim_attributes_load_error'
}

export enum PimAttributesMappingActionType {
    PIM_ATTRIBUTES_MATCH_SEARCH_COMPLETE = 'pim_attributes_match_search_complete',
    PIM_ATTRIBUTES_MAPPING_SET = 'pim_attributes_mapping_set',
    PIM_ATTRIBUTES_MAPPING_ERROR = 'pim_attributes_mapping_error'
}

export enum MagentoAttributesLoadActionType {
    MAGENTO_ATTRIBUTES_LOAD = 'magento_attributes_load',
    MAGENTO_ATTRIBUTES_LOAD_SUCCESS = 'magento_attributes_load_success',
    MAGENTO_ATTRIBUTES_LOAD_ERROR = 'magento_attributes_load_error'
}

export enum PimAttributesImportActionType {
    PIM_ATTRIBUTES_IMPORT = 'pim_attributes_import',
    PIM_ATTRIBUTES_IMPORT_SUCCESS = 'pim_attributes_import_success',
    PIM_ATTRIBUTES_IMPORT_ERROR = 'pim_attributes_import_error'
}

export enum FlashMessageActionType {
    ADD_FLASH_MESSAGE = 'add_flash_message',
    ADD_DOWNLOAD_MESSAGE = 'add_download_message',
}

export enum PimSystemActionType {
    SET_PIM_SYSTEM = 'set_pim_system',
}
