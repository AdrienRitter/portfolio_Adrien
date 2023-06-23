import type { TSESTree } from "@typescript-eslint/types";
declare type RangeAndLoc = {
    range: TSESTree.Range;
    loc: TSESTree.SourceLocation;
};
export declare class Context {
    readonly code: string;
    readonly locs: LinesAndColumns;
    private readonly locsMap;
    private readonly state;
    constructor(code: string);
    getLocFromIndex(index: number): {
        line: number;
        column: number;
    };
    /**
     * Get the location information of the given indexes.
     */
    getLocations(start: number, end: number): RangeAndLoc;
    /**
     * Build token
     */
    buildToken(type: TSESTree.Token["type"], range: TSESTree.Range): TSESTree.Token;
    /**
     * get text
     */
    getText(range: TSESTree.Range): string;
    get originalAST(): any;
    set originalAST(originalAST: any);
}
export declare class LinesAndColumns {
    private readonly lineStartIndices;
    private readonly normalizedLineFeed;
    constructor(origCode: string);
    getLocFromIndex(index: number): {
        line: number;
        column: number;
    };
    getIndexFromLoc(loc: {
        line: number;
        column: number;
    }): number;
    getNormalizedLineFeed(): NormalizedLineFeed;
}
export declare class NormalizedLineFeed {
    readonly code: string;
    private readonly offsets;
    get needRemap(): boolean;
    /**
     * Remap index
     */
    readonly remapIndex: (index: number) => number;
    constructor(code: string, offsets: number[]);
}
export {};
