import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {checkbox, relationship, select, text, timestamp} from "@keystone-6/core/fields";

export const CatalogSourceAttribute = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'code', 'type', 'magentoCode', 'catalogSource'],
        },
    },
    fields: {
        code: text({ validation: { isRequired: true }, isIndexed:true}),
        name: text({}),
        type: select({
            type: 'enum',
            options: [
                { label: 'varchar', value: 'varchar' },
                { label: 'text', value: 'text' },
                { label: 'select', value: 'select' },
            ],
        }),
        length: text({}),
        required: checkbox(),
        ignored: checkbox(),
        magentoCode: relationship({ ref: 'MagentoAttribute.assignedTo', many: false }),
        createdAt: timestamp({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
        }),
        catalogSource: select({
            type: 'enum',
            options: [
                { label: 'DigitalRiseDorset', value: 'drd' },
                { label: 'BookFeed', value: 'book' },
                { label: 'PlantSystem', value: 'plant' }
            ],
        }),
    },
})