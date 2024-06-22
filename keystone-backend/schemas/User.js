"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.isAdmin = exports.isAdminOrSameUserFilter = exports.isAdminOrSameUser = exports.hasSession = void 0;
var core_1 = require("@keystone-6/core");
var access_1 = require("@keystone-6/core/access");
var fields_1 = require("@keystone-6/core/fields");
function hasSession(_a) {
    var session = _a.session;
    return Boolean(session);
}
exports.hasSession = hasSession;
function isAdminOrSameUser(_a) {
    var session = _a.session, item = _a.item;
    // you need to have a session to do this
    if (!session)
        return false;
    // admins can do anything
    if (session.data.isAdmin)
        return true;
    // the authenticated user needs to be equal to the user we are updating
    return session.itemId === item.id;
}
exports.isAdminOrSameUser = isAdminOrSameUser;
function isAdminOrSameUserFilter(_a) {
    var _b;
    var session = _a.session;
    // you need to have a session to do this
    if (!session)
        return false;
    // admins can see everything
    if ((_b = session.data) === null || _b === void 0 ? void 0 : _b.isAdmin)
        return {};
    // the authenticated user can only see themselves
    return {
        id: {
            equals: session.itemId,
        },
    };
}
exports.isAdminOrSameUserFilter = isAdminOrSameUserFilter;
function isAdmin(_a) {
    var session = _a.session;
    // you need to have a session to do this
    if (!session)
        return false;
    // admins can do anything
    if (session.data.isAdmin)
        return true;
    // otherwise, no
    return false;
}
exports.isAdmin = isAdmin;
exports.User = (0, core_1.list)({
    access: access_1.allowAll,
    fields: {
        name: (0, fields_1.text)({
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
        email: (0, fields_1.text)({ isRequired: true, isUnique: true }),
        // the user's password, used as the secret field for authentication
        //   should not be publicly visible
        password: (0, fields_1.password)({
            access: {
                read: access_1.denyAll,
                update: isAdminOrSameUser,
            },
            validation: {
                isRequired: true,
            },
            ui: {
                itemView: {
                    // don't show this field if it isn't relevant
                    fieldMode: function (args) { return (isAdminOrSameUser(args) ? 'edit' : 'hidden'); },
                },
                listView: {
                    fieldMode: 'hidden', // TODO: is this required?
                },
            },
        }),
        // a flag to indicate if this user is an admin
        //  should not be publicly visible
        isAdmin: (0, fields_1.checkbox)({
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
                    fieldMode: function (args) { return (isAdmin(args) ? 'edit' : 'hidden'); },
                },
                itemView: {
                    fieldMode: function (args) { return (isAdmin(args) ? 'edit' : 'read'); },
                },
            },
        })
    }
});
