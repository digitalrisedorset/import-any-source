import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
    canCreateProducts: checkbox({
        defaultValue: false,
        label: 'User can Create product',
    }),
    canUpdateProducts: checkbox({
        defaultValue: false,
        label: 'User can Update product',
    }),
    canDeleteProducts: checkbox({
        defaultValue: false,
        label: 'User can Delete product',
    }),
    canImportPIMAttribute: checkbox({
        defaultValue: false,
        label: 'User can Import PIM Attribute',
    }),
    canImportMagentoAttribute: checkbox({
        defaultValue: false,
        label: 'User can Import Magento Attribute',
    }),
    canMapAttribute: checkbox({
        defaultValue: false,
        label: 'User can Map Attribute',
    }),
    canImportProduct: checkbox({
        defaultValue: false,
        label: 'User can Import Product',
    }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
    permissionFields
) as Permission[];
