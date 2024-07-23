import { isArray } from "../../../lib/type-checker";

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
    filterValidAttributes = (apiResponse: unknown): OptionAttribute[] => {
        return []
    }

    filterValidAttributesFromProduct = (apiResponse: unknown): OptionAttribute[] => {
        if (!isArray(apiResponse)) {
            throw new Error('The API response is not valid')
        }

        const attributes: OptionAttribute[] = [];
        let record = (apiResponse as Array<any>)[0];

        Object.keys(record).forEach((key) => {
            attributes.push({
                code: key,
                name: key,
                type: OptionAttributeType.other
            });
        });

        return attributes;
    }
}

