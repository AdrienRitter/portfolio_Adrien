"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEspree = void 0;
const module_1 = require("module");
const path_1 = __importDefault(require("path"));
let espreeCache = null;
/** Checks if given path is linter path */
function isLinterPath(p) {
    return (
    // ESLint 6 and above
    p.includes(`eslint${path_1.default.sep}lib${path_1.default.sep}linter${path_1.default.sep}linter.js`) ||
        // ESLint 5
        p.includes(`eslint${path_1.default.sep}lib${path_1.default.sep}linter.js`));
}
/**
 * Load `espree` from the loaded ESLint.
 * If the loaded ESLint was not found, just returns `require("espree")`.
 */
function getEspree() {
    if (!espreeCache) {
        // Lookup the loaded eslint
        const linterPath = Object.keys(require.cache || {}).find(isLinterPath);
        if (linterPath) {
            try {
                espreeCache = (0, module_1.createRequire)(linterPath)("espree");
            }
            catch {
                // ignore
            }
        }
        if (!espreeCache) {
            // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
            espreeCache = require("espree");
        }
    }
    return espreeCache;
}
exports.getEspree = getEspree;
