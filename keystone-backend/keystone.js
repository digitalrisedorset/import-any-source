"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@keystone-6/core");
var auth_1 = require("./auth");
var session_1 = require("@keystone-6/core/session");
var schema_1 = require("./schema");
var dotenv_1 = require("dotenv");
// WARNING: you need to change this
var sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   we use an expiry of one hour for this example
var sessionMaxAge = 60 * 60;
console.log("mysql://".concat((0, dotenv_1.configDotenv)().parsed.DB_USER, ":").concat((0, dotenv_1.configDotenv)().parsed.DB_PWD, "@").concat((0, dotenv_1.configDotenv)().parsed.DB_HOST, ":").concat((0, dotenv_1.configDotenv)().parsed.DB_PORT, "/").concat((0, dotenv_1.configDotenv)().parsed.DB_DATABASE));
exports.default = (0, auth_1.withAuth)((0, core_1.config)({
    server: {
        cors: { origin: ['http://localhost:3001'], credentials: true },
        port: 3000,
        maxFileSize: 200 * 1024 * 1024,
        extendExpressApp: function (app, commonContext) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); },
        extendHttpServer: function (httpServer, commonContext) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); },
    },
    db: {
        provider: 'mysql',
        url: "mysql://".concat((0, dotenv_1.configDotenv)().parsed.DB_USER, ":").concat((0, dotenv_1.configDotenv)().parsed.DB_PWD, "@").concat((0, dotenv_1.configDotenv)().parsed.DB_HOST, ":").concat((0, dotenv_1.configDotenv)().parsed.DB_PORT, "/").concat((0, dotenv_1.configDotenv)().parsed.DB_DATABASE)
    },
    lists: schema_1.lists,
    ui: {
        // only admins can view the AdminUI
        isAccessAllowed: function (context) {
            var _a, _b, _c;
            return (_c = (_b = (_a = context.session) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.isAdmin) !== null && _c !== void 0 ? _c : false;
        },
    },
    // you can find out more at https://keystonejs.com/docs/apis/session#session-api
    session: (0, session_1.statelessSessions)({
        // the maxAge option controls how long session cookies are valid for before they expire
        maxAge: sessionMaxAge,
        // the session secret is used to encrypt cookie data
        secret: sessionSecret,
    })
}));
