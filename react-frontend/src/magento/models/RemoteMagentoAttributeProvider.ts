import {RemoteMagentoAttribute} from '../../types/magento'
import {KeystoneAttribute} from '../../types/keystone'

const staticMagentoFields = [
    {
        "code": 'sku',
        "label": 'SKU',
        "frontend_input": 'TEXT',
        "is_required": true
    },
    {
        "code": 'created_at',
        "label": 'Creation Date',
        "frontend_input": 'DATE',
        "is_required": false
    },
    {
        "code": 'updated_at',
        "label": 'Updated At',
        "frontend_input": 'DATE',
        "is_required": false
    },
    {
        "code": 'product_online',
        "label": 'Product Online',
        "frontend_input": 'BOOLEAN',
        "is_required": false
    },
    {
        "code": 'configurable_variations',
        "label": 'Configurable Variation',
        "frontend_input": 'TEXT',
        "is_required": false
    }
];

const nonMappableMagentoFields = [
    'msrp_display_actual_price_type','gift_message_available','msrp','shipment_type','weight_type',
    'price_type','custom_layout_update_file','custom_layout','options_container','page_layout',
    'custom_design_to','custom_design_from','custom_design','gallery','sku_type','price_view'
];

export function RemoteMagentoAttributeProvider() {
    const setAttributeListToCreate = function (data: RemoteMagentoAttribute[]) {
        const attributeList: KeystoneAttribute[] = data.filter(
            attribute=> nonMappableMagentoFields.indexOf(attribute.code)===-1
        )
       .map(attribute => ({
            code: attribute.code,
            name: attribute.label,
            type: attribute.frontend_input,
            required: attribute.is_required
        }))
        staticMagentoFields.forEach(attribute => {
            attributeList.push({
                code: attribute.code,
                name: attribute.label,
                type: attribute.frontend_input,
                required: attribute.is_required
            })
        })

        return attributeList
    }

    return {
        setAttributeListToCreate}
}