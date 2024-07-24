import {WoocommerceProduct} from "../../../types/woocommerce";
import { isArray, isObject } from "../../../lib/type-checker";

export class ProductValidator {
    filterValidProduct = (apiResponse: unknown): WoocommerceProduct[] => {
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
        type productKeys = keyof WoocommerceProduct;
        const productFieldTypes = typeof data

        let valid = true
        // const keyToValidate = ['id', 'sku', 'name', 'price']
        // Object.keys(data).forEach((key) => {
        //     if (keyToValidate.includes(key) && !!(key in data && typeof (data as WoocommerceSimpleProduct)[key] === "string")) {
        //         valid = false
        //     }
        // });

        return valid
    }
}