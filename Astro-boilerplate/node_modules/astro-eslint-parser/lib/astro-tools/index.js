"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplate = void 0;
const template_1 = require("../parser/template");
const astro_1 = require("../astro");
/**
 * Parse the astro component template.
 */
function parseTemplate(code) {
    const parsed = (0, template_1.parseTemplate)(code);
    return {
        result: parsed.result,
        getEndOffset: (node) => (0, astro_1.getEndOffset)(node, parsed.context),
        calcAttributeValueStartOffset: (node) => (0, astro_1.calcAttributeValueStartOffset)(node, parsed.context),
        calcAttributeEndOffset: (node) => (0, astro_1.calcAttributeEndOffset)(node, parsed.context),
        walk(parent, enter, leave) {
            (0, astro_1.walk)(parent, code, enter, leave ||
                (() => {
                    /* noop */
                }));
        },
        getLocFromIndex: (index) => parsed.context.getLocFromIndex(index),
        getIndexFromLoc: (loc) => parsed.context.locs.getIndexFromLoc(loc),
    };
}
exports.parseTemplate = parseTemplate;
