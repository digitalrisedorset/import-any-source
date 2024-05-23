import {produce, castImmutable} from "immer"
import {createDraft, finishDraft} from "immer"
import {useImmer} from "use-immer";
import {MagentoAttributeData, RemoteMagentoAttribute} from '../types/magento'
import {KeystoneAttribute, RemoteAttributesToCreate} from '../types/keystone'
import {Draft} from "@reduxjs/toolkit";
import {useState} from "react";

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

interface State {
    readonly attributesToCreate: KeystoneAttribute[]
}

export function RemoteMagentoAttributeProvider() {
    const [state, setState] = useImmer({
        attributesToCreate: []
    })

    const setAttributeListToCreate = function (data: RemoteMagentoAttribute[]) {
        const attributeList: KeystoneAttribute[] = data.map(attribute => ({
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