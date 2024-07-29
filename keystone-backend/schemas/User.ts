import {list} from "@keystone-6/core";
import {allowAll, denyAll} from "@keystone-6/core/access";
import {password, text, checkbox, relationship, select} from "@keystone-6/core/fields";
import type {Session} from "../schema";

export function hasSession ({ session }: { session?: Session }) {
    return Boolean(session)
}

export function isAdminOrSameUser ({ session, item }: { session?: Session, item: Lists.User.Item }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true

    // the authenticated user needs to be equal to the user we are updating
    return session.itemId === item.id
}

export function isAdminOrSameUserFilter ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can see everything
    if (session.data?.isAdmin) return {}

    // the authenticated user can only see themselves
    return {
        id: {
            equals: session.itemId,
        },
    }
}

export function isAdmin ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true

    // otherwise, no
    return false
}

export const User = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'email', 'role'],
        },
    },
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
            isIndexed: 'unique',
            validation: {
                isRequired: true,
            },
        }),
        email: text({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can update this field
                update: isAdmin,
            },
            isFilterable: false,
            isOrderable: false,
            isIndexed: 'unique',
            validation: {
                isRequired: true,
            },
        }),
        // the user's password, used as the secret field for authentication
        //   should not be publicly visible
        password: password({
            access: {
                read: denyAll, // TODO: is this required?
                update: isAdminOrSameUser,
            },
            validation: {
                isRequired: true,
            },
            ui: {
                itemView: {
                    // don't show this field if it isn't relevant
                    fieldMode: args => (isAdminOrSameUser(args) ? 'edit' : 'hidden'),
                },
                listView: {
                    fieldMode: 'hidden', // TODO: is this required?
                },
            },
        }),
        role: relationship({
            ref: 'Role.assignedTo'
        }),
        theme: select({
            type: 'enum',
            options: [
                { label: 'Yellow', value: 'happy' },
                { label: 'Red', value: 'red' },
                { label: 'Blue', value: 'blue' },
                { label: 'Brown', value: 'forest' },
            ],
        }),
        // a flag to indicate if this user is an admin
        //  should not be publicly visible
        isAdmin: checkbox({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can create, or update this field
                create: isAdmin,
                update: isAdmin,
            },
            defaultValue: false,
            ui: {
                // only admins can edit this field
                createView: {
                    fieldMode: args => (isAdmin(args) ? 'edit' : 'hidden'),
                },
                itemView: {
                    fieldMode: args => (isAdmin(args) ? 'edit' : 'read'),
                },
            },
        })
    }
})