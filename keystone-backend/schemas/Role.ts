import { relationship, text } from "@keystone-6/core/fields";
import {list} from "@keystone-6/core";
import { permissionFields } from './fields';
import {isAdmin, isAdminOrSameUser} from "./User";
import {allowAll} from "@keystone-6/core/access";

export const Role = list({
    access: allowAll,
    fields: {
        name: text({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can update this field
                update: isAdmin,
            },
            isFilterable: false,
            isOrderable: false,
            // isIndexed: 'unique',
            validation: {
                isRequired: true,
            },
        }),
        ...permissionFields,
        assignedTo: relationship({
            ref: 'User.role',
            many: true,
            ui: {
                itemView: { fieldMode: 'read' },
            },
        }),
    },
});
