import {WoocommerceAttribute, Attribute} from "../../../types";
import {isArray, isObject} from "../../../lib/type-checker";

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
        if (!isArray(apiResponse)) {
            throw new Error('The API response is not valid')
        }

        return (apiResponse as Array<any>).filter(
            (item: any): boolean => {
                return isObject(item)
                    && "slug" in item && typeof item["slug"] === "string"
                    && "name" in item && typeof item["name"] === "string"
            }
        ).map((elem: WoocommerceAttribute): Attribute => {
            return {
                code: elem['slug'],
                name: elem['name'],
                type: OptionAttributeType.options
            }
        })
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