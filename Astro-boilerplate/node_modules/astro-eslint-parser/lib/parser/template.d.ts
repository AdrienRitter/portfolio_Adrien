import type { ParseResult } from "@astrojs/compiler";
import { Context } from "../context";
export declare type TemplateResult = {
    result: ParseResult;
    context: Context;
};
/**
 * Parse the astro component template.
 */
export declare function parseTemplate(code: string): TemplateResult;
