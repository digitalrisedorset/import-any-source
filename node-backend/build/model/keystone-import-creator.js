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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystoneImportCreator = void 0;
const fs = require('node:fs/promises');
const path = require("path");
var ImageType;
(function (ImageType) {
    ImageType["jpeg"] = "image/jpeg";
})(ImageType || (ImageType = {}));
var ImageEncoding;
(function (ImageEncoding) {
    ImageEncoding["sevenbit"] = "7bit";
})(ImageEncoding || (ImageEncoding = {}));
class KeystoneImportCreator {
    constructor() {
        this.createSeedImport = function (data) {
            return __awaiter(this, void 0, void 0, function* () {
                const rows = data.map(record => {
                    var _a, _b;
                    const row = {
                        name: record.name,
                        description: record.description,
                        status: (record.status === 'publish') ? 'AVAILABLE' : 'UNAVAILABLE',
                        price: record.price * 100,
                        photo: {
                            filename: (_a = record.images[0]) === null || _a === void 0 ? void 0 : _a.name,
                            mimetype: ImageType.jpeg,
                            encoding: ImageEncoding.sevenbit,
                            secure_url: (_b = record.images[0]) === null || _b === void 0 ? void 0 : _b.src,
                        }
                    };
                    return row;
                });
                yield fs.writeFile(path.resolve(process.env.IMPORT_CSV_FOLDER, 'keystone-products.ts'), 'export const products = ' + JSON.stringify(rows, null, 2));
            });
        };
    }
}
exports.KeystoneImportCreator = KeystoneImportCreator;
