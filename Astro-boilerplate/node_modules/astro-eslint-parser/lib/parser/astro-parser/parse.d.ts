import type { ParseResult } from "@astrojs/compiler";
import type { Context } from "../../context";
/**
 * Parse code by `@astrojs/compiler`
 */
export declare function parse(code: string, ctx: Context): ParseResult;
