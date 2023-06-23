"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
/**
 * Astro parse errors.
 */
class ParseError extends SyntaxError {
    /**
     * Initialize this ParseError instance.
     */
    constructor(message, offset, ctx) {
        super(message);
        this.index = offset;
        const loc = ctx.getLocFromIndex(offset);
        this.lineNumber = loc.line;
        this.column = loc.column;
        this.originalAST = ctx.originalAST;
    }
}
exports.ParseError = ParseError;
