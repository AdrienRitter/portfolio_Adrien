import type { ParseResult } from "@astrojs/compiler";
import type { AttributeNode, Node, ParentNode } from "@astrojs/compiler/types";
export interface ParseTemplateResult {
    result: ParseResult;
    getEndOffset: (node: Node) => number;
    calcAttributeValueStartOffset: (node: AttributeNode) => number;
    calcAttributeEndOffset: (node: AttributeNode) => number;
    walk: (parent: ParentNode, enter: (n: Node | AttributeNode, parents: ParentNode[]) => void, leave?: (n: Node | AttributeNode, parents: ParentNode[]) => void) => void;
    getLocFromIndex: (index: number) => {
        line: number;
        column: number;
    };
    getIndexFromLoc: (loc: {
        line: number;
        column: number;
    }) => number;
}
/**
 * Parse the astro component template.
 */
export declare function parseTemplate(code: string): ParseTemplateResult;
