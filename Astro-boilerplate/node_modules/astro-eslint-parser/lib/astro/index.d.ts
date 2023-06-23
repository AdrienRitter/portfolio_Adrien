import type { AttributeNode, CommentNode, Node, ParentNode, TagLikeNode } from "@astrojs/compiler/types";
import type { Context } from "../context";
/**
 * Checks if the given node is TagLikeNode
 */
export declare function isTag(node: Node): node is Node & TagLikeNode;
/**
 * Checks if the given node is ParentNode
 */
export declare function isParent(node: Node): node is ParentNode;
/** walk element nodes */
export declare function walkElements(parent: ParentNode, code: string, enter: (n: Node, parents: ParentNode[]) => void, leave: (n: Node, parents: ParentNode[]) => void, parents?: ParentNode[]): void;
/** walk nodes */
export declare function walk(parent: ParentNode, code: string, enter: (n: Node | AttributeNode, parents: ParentNode[]) => void, leave: (n: Node | AttributeNode, parents: ParentNode[]) => void): void;
/**
 * Get end offset of start tag
 */
export declare function calcStartTagEndOffset(node: TagLikeNode, ctx: Context): number;
/**
 * Get end offset of attribute
 */
export declare function calcAttributeEndOffset(node: AttributeNode, ctx: Context): number;
/**
 * Get start offset of attribute value
 */
export declare function calcAttributeValueStartOffset(node: AttributeNode, ctx: Context): number;
/**
 * Get end offset of tag
 */
export declare function getEndOffset(node: Node, ctx: Context): number;
/**
 * Get content end offset
 */
export declare function calcContentEndOffset(parent: ParentNode, ctx: Context): number;
/**
 * If the given tag is a self-close tag, get the self-closing tag.
 */
export declare function getSelfClosingTag(node: TagLikeNode, ctx: Context): null | {
    offset: number;
    end: "/>" | ">";
};
/**
 * If the given tag has a end tag, get the end tag.
 */
export declare function getEndTag(node: TagLikeNode, ctx: Context): null | {
    offset: number;
    tag: string;
};
/**
 * Get end offset of comment
 */
export declare function calcCommentEndOffset(node: CommentNode, ctx: Context): number;
/**
 * Skip spaces
 */
export declare function skipSpaces(string: string, position: number): number;
