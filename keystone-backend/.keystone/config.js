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
var import_core2 = require("@keystone-6/core");

// example-utils.ts
var fixPrismaPath = {
  prismaClientPath: "node_modules/.myprisma/client"
};

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  WoocommerceAttribute: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      code: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: true }),
      name: (0, import_fields.text)({}),
      type: (0, import_fields.select)({
        type: "enum",
        options: [
          { label: "varchar", value: "varchar" },
          { label: "text", value: "text" },
          { label: "select", value: "select" }
        ]
      }),
      length: (0, import_fields.text)({}),
      required: (0, import_fields.checkbox)(),
      magentoCode: (0, import_fields.relationship)({ ref: "MagentoAttribute.assignedTo", many: false }),
      createdAt: (0, import_fields.timestamp)({
        // default this timestamp to Date.now() when first created
        defaultValue: { kind: "now" }
      })
    }
  }),
  MagentoAttribute: (0, import_core.list)({
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
  })
};

// keystone.ts
var keystone_default = (0, import_core2.config)({
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
  lists
});
//# sourceMappingURL=config.js.map
