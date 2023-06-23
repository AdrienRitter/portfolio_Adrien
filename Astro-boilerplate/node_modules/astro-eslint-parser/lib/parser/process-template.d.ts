import type { ParseResult } from "@astrojs/compiler";
import type { Context } from "../context";
import { ScriptContext } from "../context/script";
/**
 * Process the template to generate a ScriptContext.
 */
export declare function processTemplate(ctx: Context, resultTemplate: ParseResult): ScriptContext;
