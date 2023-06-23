"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const synckit_1 = require("synckit");
const parseSync = (0, synckit_1.createSyncFn)(require.resolve("./astrojs-compiler-worker"));
/**
 * Parse code by `@astrojs/compiler`
 */
function parse(code, options) {
    return parseSync(code, options);
}
exports.parse = parse;
