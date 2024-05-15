var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// example-utils.ts
var fixPrismaPath = {
  prismaClientPath: "node_modules/.myprisma/client"
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var { withAuth } = (0, import_auth.createAuth)({
  // this is the list that contains our users
  listKey: "User",
  // an identity field, typically a username or an email address
  identityField: "name",
  // a secret field must be a password field type
  secretField: "password",
  // initFirstItem enables the "First User" experience, this will add an interface form
  //   adding a new User item if the database is empty
  //
  // WARNING: do not use initFirstItem in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // the following fields are used by the "Create First User" form
    fields: ["name", "password"],
    // the following fields are configured by default for this item
    itemData: {
      // isAdmin is true, so the admin can pass isAccessAllowed (see below)
      isAdmin: true
    }
  },
  // add isAdmin to the session data
  sessionData: "isAdmin"
});

// keystone.ts
var import_session = require("@keystone-6/core/session");

// schemas/MagentoAttribute.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var MagentoAttribute = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    code: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: true }),
    name: (0, import_fields.text)({}),
    type: (0, import_fields.select)({
      type: "enum",
      options: [
        { label: "varchar", value: "TEXT" },
        { label: "text", value: "TEXTAREA" },
        { label: "select", value: "SELECT" },
        { label: "multiselect", value: "MULTISELECT" },
        { label: "date", value: "DATE" },
        { label: "bool", value: "BOOLEAN" },
        { label: "price", value: "PRICE" },
        { label: "weight", value: "WEIGHT" },
        { label: "gallery", value: "GALLERY" },
        { label: "image", value: "MEDIA_IMAGE" }
      ]
    }),
    length: (0, import_fields.text)({}),
    required: (0, import_fields.checkbox)(),
    assignedTo: (0, import_fields.relationship)({ ref: "WoocommerceAttribute.magentoCode", many: false }),
    createdAt: (0, import_fields.timestamp)({
      // default this timestamp to Date.now() when first created
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/WoocommerceAttribute.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var WoocommerceAttribute = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    code: (0, import_fields2.text)({ validation: { isRequired: true }, isIndexed: true }),
    name: (0, import_fields2.text)({}),
    type: (0, import_fields2.select)({
      type: "enum",
      options: [
        { label: "varchar", value: "varchar" },
        { label: "text", value: "text" },
        { label: "select", value: "select" }
      ]
    }),
    length: (0, import_fields2.text)({}),
    required: (0, import_fields2.checkbox)(),
    magentoCode: (0, import_fields2.relationship)({ ref: "MagentoAttribute.assignedTo", many: false }),
    createdAt: (0, import_fields2.timestamp)({
      // default this timestamp to Date.now() when first created
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/User.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
function isAdminOrSameUser({ session, item }) {
  if (!session)
    return false;
  if (session.data.isAdmin)
    return true;
  return session.itemId === item.id;
}
function isAdmin({ session }) {
  if (!session)
    return false;
  if (session.data.isAdmin)
    return true;
  return false;
}
var User = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)({
      access: {
        // only the respective user, or an admin can read this field
        read: isAdminOrSameUser,
        // only admins can update this field
        update: isAdmin
      },
      isFilterable: false,
      isOrderable: false,
      isIndexed: "unique",
      validation: {
        isRequired: true
      }
    }),
    email: (0, import_fields3.text)({ isRequired: true, isUnique: true }),
    // the user's password, used as the secret field for authentication
    //   should not be publicly visible
    password: (0, import_fields3.password)({
      access: {
        read: import_access3.denyAll,
        // TODO: is this required?
        update: isAdminOrSameUser
      },
      validation: {
        isRequired: true
      },
      ui: {
        itemView: {
          // don't show this field if it isn't relevant
          fieldMode: (args) => isAdminOrSameUser(args) ? "edit" : "hidden"
        },
        listView: {
          fieldMode: "hidden"
          // TODO: is this required?
        }
      }
    }),
    // a flag to indicate if this user is an admin
    //  should not be publicly visible
    isAdmin: (0, import_fields3.checkbox)({
      access: {
        // only the respective user, or an admin can read this field
        read: isAdminOrSameUser,
        // only admins can create, or update this field
        create: isAdmin,
        update: isAdmin
      },
      defaultValue: false,
      ui: {
        // only admins can edit this field
        createView: {
          fieldMode: (args) => isAdmin(args) ? "edit" : "hidden"
        },
        itemView: {
          fieldMode: (args) => isAdmin(args) ? "edit" : "read"
        }
      }
    })
  }
});

// schema.ts
var lists = {
  User,
  WoocommerceAttribute,
  MagentoAttribute
};

// keystone.ts
var sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
var sessionMaxAge = 60 * 60;
var keystone_default = withAuth(
  (0, import_core4.config)({
    server: {
      cors: { origin: ["http://localhost:3001"], credentials: true },
      port: 3e3,
      maxFileSize: 200 * 1024 * 1024,
      extendExpressApp: async (app, commonContext) => {
      },
      extendHttpServer: async (httpServer, commonContext) => {
      }
    },
    db: {
      provider: "sqlite",
      url: process.env.DATABASE_URL || "file:./keystone-example.db",
      // WARNING: this is only needed for our monorepo examples, dont do this
      ...fixPrismaPath
    },
    lists,
    ui: {
      // only admins can view the AdminUI
      isAccessAllowed: (context) => {
        return context.session?.data?.isAdmin ?? false;
      }
    },
    // you can find out more at https://keystonejs.com/docs/apis/session#session-api
    session: (0, import_session.statelessSessions)({
      // the maxAge option controls how long session cookies are valid for before they expire
      maxAge: sessionMaxAge,
      // the session secret is used to encrypt cookie data
      secret: sessionSecret
    })
  })
);
//# sourceMappingURL=config.js.map
