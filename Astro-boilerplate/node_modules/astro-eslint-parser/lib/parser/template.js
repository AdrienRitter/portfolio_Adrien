"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplate = void 0;
const astro_1 = require("../astro");
const context_1 = require("../context");
const errors_1 = require("../errors");
const parse_1 = require("./astro-parser/parse");
const lru_cache_1 = require("./lru-cache");
const lruCache = new lru_cache_1.LruCache(5);
/**
 * Parse the astro component template.
 */
function parseTemplate(code) {
    const cache = lruCache.get(code);
    if (cache) {
        return cache;
    }
    const ctx = new context_1.Context(code);
    const normalized = ctx.locs.getNormalizedLineFeed();
    const ctxForAstro = normalized.needRemap
        ? new context_1.Context(normalized.code)
        : ctx;
    try {
        const result = (0, parse_1.parse)(normalized?.code ?? code, ctxForAstro);
        if (normalized.needRemap) {
            remap(result, normalized, code, ctxForAstro);
            ctx.originalAST = ctxForAstro.originalAST;
        }
        const templateResult = {
            result,
            context: ctx,
        };
        lruCache.set(code, templateResult);
        return templateResult;
    }
    catch (e) {
        if (typeof e.pos === "number") {
            const err = new errors_1.ParseError(e.message, normalized?.remapIndex(e.pos), ctx);
            err.astroCompilerError = e;
            throw err;
        }
        throw e;
    }
}
exports.parseTemplate = parseTemplate;
/** Remap */
function remap(result, normalized, originalCode, ctxForAstro) {
    const remapDataMap = new Map();
    (0, astro_1.walk)(result.ast, normalized.code, (node) => {
        const start = normalized.remapIndex(node.position.start.offset);
        let end, value;
        if (node.position.end) {
            end = normalized.remapIndex(node.position.end.offset);
            if (node.position.start.offset === start &&
                node.position.end.offset === end) {
                return;
            }
        }
        if (node.type === "text") {
            value = originalCode.slice(start, normalized.remapIndex((0, astro_1.getEndOffset)(node, ctxForAstro)));
        }
        else if (node.type === "comment") {
            value = originalCode.slice(start + 4, normalized.remapIndex((0, astro_1.getEndOffset)(node, ctxForAstro)) - 3);
        }
        else if (node.type === "attribute") {
            if (node.kind !== "empty" &&
                node.kind !== "shorthand" &&
                node.kind !== "spread") {
                let valueStart = normalized.remapIndex((0, astro_1.calcAttributeValueStartOffset)(node, ctxForAstro));
                let valueEnd = normalized.remapIndex((0, astro_1.calcAttributeEndOffset)(node, ctxForAstro));
                if (node.kind !== "quoted" ||
                    originalCode[valueStart] === '"' ||
                    originalCode[valueStart] === "'") {
                    valueStart++;
                    valueEnd--;
                }
                value = originalCode.slice(valueStart, valueEnd);
            }
        }
        remapDataMap.set(node, {
            start,
            end,
            value,
        });
    }, (_node) => {
        /* noop */
    });
    for (const [node, remapData] of remapDataMap) {
        node.position.start.offset = remapData.start;
        if (node.position.end) {
            node.position.end.offset = remapData.end;
        }
        if (node.type === "text" ||
            node.type === "comment" ||
            (node.type === "attribute" &&
                node.kind !== "empty" &&
                node.kind !== "shorthand" &&
                node.kind !== "spread")) {
            node.value = remapData.value;
        }
    }
}
