import { WoocommerceAttribute, Attribute } from "../../../types/woocommerce";
import { isArray, isObject } from "../../../lib/type-checker";

enum OptionAttributeType {
    options = 'options',
    other = 'unknown',
}

interface OptionAttribute {
    code: string,
    name: string,
    type: OptionAttributeType
}

export class AttributeValidator {
    filterValidAttributes = (apiResponse: unknown): Attribute[] => {
        return []
    }

    filterValidAttributesFromProduct = (apiResponse: unknown): Attribute[] => {
        if (!isArray(apiResponse)) {
            throw new Error('The API response is not valid')
        }

        const attributes: OptionAttribute[] = [];
        let record = (apiResponse as Array<any>)[0];

        Object.keys(record).forEach((key, index) => {
            attributes.push({
                code: key,
                name: key,
                type: OptionAttributeType.other
            });
        });

        return attributes;
    }
}

