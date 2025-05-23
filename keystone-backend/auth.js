"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = void 0;
var auth_1 = require("@keystone-6/auth");
// withAuth is a function we can use to wrap our base configuration
exports.withAuth = (0, auth_1.createAuth)({
    // this is the list that contains our users
    listKey: 'User',
    // an identity field, typically a username or an email address
    identityField: 'name',
    // a secret field must be a password field type
    secretField: 'password',
    // initFirstItem enables the "First User" experience, this will add an interface form
    //   adding a new User item if the database is empty
    //
    // WARNING: do not use initFirstItem in production
    //   see https://keystonejs.com/docs/config/auth#init-first-item for more
    initFirstItem: {
        // the following fields are used by the "Create First User" form
        fields: ['name', 'password'],
        // the following fields are configured by default for this item
        itemData: {
            // isAdmin is true, so the admin can pass isAccessAllowed (see below)
            isAdmin: true,
        },
    },
    // add isAdmin to the session data
    sessionData: 'isAdmin',
}).withAuth;
