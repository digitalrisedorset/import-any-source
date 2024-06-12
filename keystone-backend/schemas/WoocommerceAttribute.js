"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoocommerceAttribute = void 0;
var core_1 = require("@keystone-6/core");
var access_1 = require("@keystone-6/core/access");
var fields_1 = require("@keystone-6/core/fields");
exports.WoocommerceAttribute = (0, core_1.list)({
    access: access_1.allowAll,
    fields: {
        code: (0, fields_1.text)({ validation: { isRequired: true }, isIndexed: true }),
        name: (0, fields_1.text)({}),
        type: (0, fields_1.select)({
            type: 'enum',
            options: [
                { label: 'varchar', value: 'varchar' },
                { label: 'text', value: 'text' },
                { label: 'select', value: 'select' },
            ],
        }),
        length: (0, fields_1.text)({}),
        required: (0, fields_1.checkbox)(),
        ignored: (0, fields_1.checkbox)(),
        magentoCode: (0, fields_1.relationship)({ ref: 'MagentoAttribute.assignedTo', many: false }),
        createdAt: (0, fields_1.timestamp)({
            // default this timestamp to Date.now() when first created
            defaultValue: { kind: 'now' },
        }),
    },
});
