import type { Context } from "./context";
/**
 * Astro parse errors.
 */
export declare class ParseError extends SyntaxError {
    index: number;
    lineNumber: number;
    column: number;
    originalAST: any;
    /**
     * Initialize this ParseError instance.
     */
    constructor(message: string, offset: number, ctx: Context);
}
