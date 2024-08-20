import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {checkbox, relationship, select, text, timestamp} from "@keystone-6/core/fields";

export const MagentoAttribute = list({
    access: allowAll,
    fields: {
        code: text({ validation: { isRequired: true }, isIndexed:true}),
        name: text({}),
        type: select({
            type: 'enum',
            options: [
                { label: 'varchar', value: 'TEXT' },
                { label: 'text', value: 'TEXTAREA' },
                { label: 'select', value: 'SELECT' },
                { label: 'multiselect', value: 'MULTISELECT' },
                { label: 'date', value: 'DATE' },
                { label: 'bool', value: 'BOOLEAN' },
                { label: 'price', value: 'PRICE' },
                { label: 'weight', value: 'WEIGHT' },
                { label: 'gallery', value: 'GALLERY' },
                { label: 'image', value: 'MEDIA_IMAGE' },
            ],
        }),
        length: text({}),
        required: checkbox(),
        assignedTo: relationship({ ref: 'CatalogSourceAttribute.magentoCode', many: true }),
        createdAt: timestamp({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
        }),
    }
})