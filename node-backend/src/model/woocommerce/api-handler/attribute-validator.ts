import {isArray} from "../../../lib/type-checker";
import {z} from "zod";

enum OptionAttributeType {
    options = 'options',
    other = 'unknown',
}

interface OptionAttribute {
    code: string,
    name: string,
    type: OptionAttributeType
}

const AttributeResult = z.object({
    slug: z.string(),
    name: z.string()
})

export class AttributeValidator {
    filterValidAttributes = (apiResponse: unknown): OptionAttribute[] => {
        if (!isArray(apiResponse)) {
            throw new Error('The API response is not valid')
        }

        return (apiResponse as Array<any>).filter(
            (item: any) => AttributeResult.parse(item)
        ).map((elem): OptionAttribute => {
            return {
                code: elem.slug,
                name: elem.name,
                type: OptionAttributeType.options
            }
        })
    }

    filterValidAttributesFromProduct = (apiResponse: unknown): OptionAttribute[] => {
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