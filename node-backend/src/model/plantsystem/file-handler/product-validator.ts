import { isArray, isObject } from "../../../lib/type-checker";
import {BookProduct} from "../../../types/book";
import {PlantProduct} from "../../../types/plant";

export class ProductValidator {
    filterValidProduct = (apiResponse: unknown): PlantProduct[] => {
        if (!isArray(apiResponse)) {
            throw new Error('The API response is not valid')
        }

        return (apiResponse as Array<any>).filter(
            (item: any): boolean => {
                return isObject(item) && this.hasPropertyWithRightType(item)
            }
        )
    }

    hasPropertyWithRightType = (data: object): boolean => {
        type productKeys = keyof BookProduct;
        const productFieldTypes = typeof data

        let valid = true
        // const keyToValidate = ['id', 'sku', 'name', 'price']
        // Object.keys(data).forEach((key) => {
        //     if (keyToValidate.includes(key) && !!(key in data && typeof (data as DrdSimpleProduct)[key] === "string")) {
        //         valid = false
        //     }
        // });

        return valid
    }
}