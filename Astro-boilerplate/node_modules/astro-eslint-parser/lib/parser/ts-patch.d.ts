import type { ParserOptions } from "@typescript-eslint/types";
export declare type PatchTerminate = {
    terminate: () => void;
};
/**
 * Apply a patch to parse .astro files as TSX.
 */
export declare function tsPatch(scriptParserOptions: ParserOptions): PatchTerminate | null;
