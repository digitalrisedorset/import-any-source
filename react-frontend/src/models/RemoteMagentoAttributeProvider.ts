import {produce} from "immer"
import {useImmer} from "use-immer";
import {RemoteMagentoAttribute} from '../types/magento'
import {KeystoneAttribute} from '../types/keystone'
import {Draft} from "@reduxjs/toolkit";

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

interface State {
    readonly attributesToCreate: KeystoneAttribute[]
}

export function RemoteMagentoAttributeProvider() {
    const [state, setState] = useImmer({
        attributesToCreate: []
    })

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

        setState(produce((draft: Draft<State>) => {
            draft.attributesToCreate = attributeList
        }))
    }

    const hasAttributesToCreate = function () {
        return getAttributesToCreateCount()>0
    }

    const getAttributesToCreateCount = function () {
        if (state.attributesToCreate === undefined) {
            return false;
        }
        return state.attributesToCreate.length
    }

    const getAttributesToCreate = function () {
        return state.attributesToCreate
    }

    return {
        setAttributeListToCreate,
        hasAttributesToCreate,
        getAttributesToCreate,
        getAttributesToCreateCount
    }
}