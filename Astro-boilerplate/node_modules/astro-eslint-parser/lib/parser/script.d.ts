import type { Context } from "../context";
import type { ParserOptionsContext } from "../context/parser-options";
import type { ESLintExtendedProgram } from "../types";
/**
 * Parse for script
 */
export declare function parseScript(code: string, _ctx: Context, parserOptions: ParserOptionsContext): ESLintExtendedProgram;
