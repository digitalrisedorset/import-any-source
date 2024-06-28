export enum WoocommmerceAttributesLoadActionType {
    WOOCOMMERCE_ATTRIBUTES_LOAD = 'woocommerce_attributes_load',
    WOOCOMMERCE_ATTRIBUTES_LOAD_SUCCESS = 'woocommerce_attributes_load_success',
    WOOCOMMERCE_ATTRIBUTES_LOAD_ERROR = 'woocommerce_attributes_load_error'
}

export enum WoocommmerceAttributesMappingActionType {
    WOOCOMMERCE_ATTRIBUTES_MATCH_SEARCH_COMPLETE = 'woocommerce_attributes_match_search_complete',
    WOOCOMMERCE_ATTRIBUTES_MAPPING_SET = 'woocommerce_attributes_mapping_set',
    WOOCOMMERCE_ATTRIBUTES_MAPPING_ERROR = 'woocommerce_attributes_mapping_error'
}

export enum MagentoAttributesLoadActionType {
    MAGENTO_ATTRIBUTES_LOAD = 'magento_attributes_load',
    MAGENTO_ATTRIBUTES_LOAD_SUCCESS = 'magento_attributes_load_success',
    MAGENTO_ATTRIBUTES_LOAD_ERROR = 'magento_attributes_load_error'
}

export enum WoocommmerceAttributesImportActionType {
    WOOCOMMERCE_ATTRIBUTES_IMPORT = 'woocommerce_attributes_import',
    WOOCOMMERCE_ATTRIBUTES_IMPORT_SUCCESS = 'woocommerce_attributes_import_success',
    WOOCOMMERCE_ATTRIBUTES_IMPORT_ERROR = 'woocommerce_attributes_import_error'
}

export enum FlashMessageActionType {
    ADD_FLASH_MESSAGE = 'add_flash_message',
    RESET_FLASH_MESSAGE = 'reset_flash_message',
    ADD_DOWNLOAD_MESSAGE = 'add_download_message',
}