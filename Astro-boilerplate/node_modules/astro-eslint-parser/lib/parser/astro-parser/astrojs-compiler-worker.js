"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const synckit_1 = require("synckit");
const dynamicImport = new Function("m", "return import(m)");
(0, synckit_1.runAsWorker)(async (source) => {
    const { parse } = await dynamicImport("@astrojs/compiler");
    // console.time("parse")
    const result = parse(source);
    // console.timeEnd("parse")
    return result;
});
