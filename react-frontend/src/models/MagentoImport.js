import {useImmer} from "use-immer";

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
    }
];

export function MagentoImport() {
    const [state, setState] = useImmer({
        attributesToCreate: []
    })

    const setAttributeListToCreate = function (data) {
        const attributeList = [...staticMagentoFields,...data]
        setState(draft => {
            draft.attributesToCreate = attributeList.map(attribute => ({
                code: attribute.code,
                name: attribute.label,
                type: attribute.frontend_input,
                required: attribute.is_required
            }))
        })
    }

    const hasAttributesToCreate = function () {
        return this.getAttributesToCreateCount()>0
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
