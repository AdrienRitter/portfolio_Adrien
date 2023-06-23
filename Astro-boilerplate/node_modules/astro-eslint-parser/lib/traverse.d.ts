import type { VisitorKeys } from "eslint-visitor-keys";
import type { TSESTree } from "@typescript-eslint/types";
import type { AstroNode } from "./ast";
/**
 * Get the keys of the given node to traverse it.
 * @param node The node to get.
 * @returns The keys to traverse.
 */
export declare function getFallbackKeys(node: any): string[];
/**
 * Get the keys of the given node to traverse it.
 * @param node The node to get.
 * @returns The keys to traverse.
 */
export declare function getKeys(node: any, visitorKeys?: VisitorKeys): string[];
/**
 * Get the nodes of the given node.
 * @param node The node to get.
 */
export declare function getNodes(node: any, key: string): IterableIterator<AstroNode | TSESTree.Node>;
export interface Visitor<N> {
    visitorKeys?: VisitorKeys;
    enterNode(node: N, parent: N | null): void;
    leaveNode(node: N, parent: N | null): void;
}
export declare function traverseNodes(node: AstroNode, visitor: Visitor<AstroNode | TSESTree.Node>): void;
export declare function traverseNodes(node: TSESTree.Node, visitor: Visitor<TSESTree.Node>): void;
