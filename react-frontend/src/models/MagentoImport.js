import {useImmer} from "use-immer";

export function MagentoImport() {
    const [state, setState] = useImmer({
        attributesToCreate: []
    })

    const setAttributeListToCreate = function (data) {
        setState(draft => {
            draft.attributesToCreate = data.map(attribute => ({
                code: attribute.code,
                name: attribute.label,
                type: attribute.frontend_input,
                required: false
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
