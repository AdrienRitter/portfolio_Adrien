"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYS = void 0;
const eslint_visitor_keys_1 = require("eslint-visitor-keys");
const astroKeys = {
    Program: ["body"],
    AstroFragment: ["children"],
    AstroHTMLComment: [],
    AstroDoctype: [],
    AstroShorthandAttribute: ["name", "value"],
    AstroTemplateLiteralAttribute: ["name", "value"],
    AstroRawText: [],
};
exports.KEYS = (0, eslint_visitor_keys_1.unionWith)(astroKeys);
