"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagentoAttribute = void 0;
var core_1 = require("@keystone-6/core");
var access_1 = require("@keystone-6/core/access");
var fields_1 = require("@keystone-6/core/fields");
exports.MagentoAttribute = (0, core_1.list)({
    access: access_1.allowAll,
    fields: {
        code: (0, fields_1.text)({ validation: { isRequired: true }, isIndexed: true }),
        name: (0, fields_1.text)({}),
        type: (0, fields_1.select)({
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
        length: (0, fields_1.text)({}),
        required: (0, fields_1.checkbox)(),
        assignedTo: (0, fields_1.relationship)({ ref: 'WoocommerceAttribute.magentoCode', many: false }),
        createdAt: (0, fields_1.timestamp)({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
        }),
    }
});
