"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipSpaces = exports.calcCommentEndOffset = exports.getEndTag = exports.getSelfClosingTag = exports.calcContentEndOffset = exports.getEndOffset = exports.calcAttributeValueStartOffset = exports.calcAttributeEndOffset = exports.calcStartTagEndOffset = exports.walk = exports.walkElements = exports.isParent = exports.isTag = void 0;
const errors_1 = require("../errors");
/**
 * Checks if the given node is TagLikeNode
 */
function isTag(node) {
    return (node.type === "element" ||
        node.type === "custom-element" ||
        node.type === "component" ||
        node.type === "fragment");
}
exports.isTag = isTag;
/**
 * Checks if the given node is ParentNode
 */
function isParent(node) {
    return Array.isArray(node.children);
}
exports.isParent = isParent;
/** walk element nodes */
function walkElements(parent, code, enter, leave, parents = []) {
    const children = getSortedChildren(parent, code);
    const currParents = [parent, ...parents];
    for (const node of children) {
        enter(node, currParents);
        if (isParent(node)) {
            walkElements(node, code, enter, leave, currParents);
        }
        leave(node, currParents);
    }
}
exports.walkElements = walkElements;
/** walk nodes */
function walk(parent, code, enter, leave) {
    walkElements(parent, code, (node, parents) => {
        enter(node, parents);
        if (isTag(node)) {
            const attrParents = [node, ...parents];
            for (const attr of node.attributes) {
                enter(attr, attrParents);
                leave(attr, attrParents);
            }
        }
    }, leave);
}
exports.walk = walk;
/**
 * Get end offset of start tag
 */
function calcStartTagEndOffset(node, ctx) {
    const lastAttr = node.attributes[node.attributes.length - 1];
    let beforeCloseIndex;
    if (lastAttr) {
        beforeCloseIndex = calcAttributeEndOffset(lastAttr, ctx);
    }
    else {
        const info = getTokenInfo(ctx, [`<${node.name}`], node.position.start.offset);
        beforeCloseIndex = info.index + info.match.length;
    }
    const info = getTokenInfo(ctx, [[">", "/>"]], beforeCloseIndex);
    return info.index + info.match.length;
}
exports.calcStartTagEndOffset = calcStartTagEndOffset;
/**
 * Get end offset of attribute
 */
function calcAttributeEndOffset(node, ctx) {
    let info;
    if (node.kind === "empty") {
        info = getTokenInfo(ctx, [node.name], node.position.start.offset);
    }
    else if (node.kind === "quoted") {
        info = getTokenInfo(ctx, [[`"${node.value}"`, `'${node.value}'`, node.value]], calcAttributeValueStartOffset(node, ctx));
    }
    else if (node.kind === "expression") {
        info = getTokenInfo(ctx, ["{", node.value, "}"], calcAttributeValueStartOffset(node, ctx));
    }
    else if (node.kind === "shorthand") {
        info = getTokenInfo(ctx, ["{", node.name, "}"], node.position.start.offset);
    }
    else if (node.kind === "spread") {
        info = getTokenInfo(ctx, ["{", "...", node.name, "}"], node.position.start.offset);
    }
    else if (node.kind === "template-literal") {
        info = getTokenInfo(ctx, [`\`${node.value}\``], calcAttributeValueStartOffset(node, ctx));
    }
    else {
        throw new errors_1.ParseError(`Unknown attr kind: ${node.kind}`, node.position.start.offset, ctx);
    }
    return info.index + info.match.length;
}
exports.calcAttributeEndOffset = calcAttributeEndOffset;
/**
 * Get start offset of attribute value
 */
function calcAttributeValueStartOffset(node, ctx) {
    let info;
    if (node.kind === "quoted") {
        info = getTokenInfo(ctx, [node.name, "=", [`"`, `'`, node.value]], node.position.start.offset);
    }
    else if (node.kind === "expression") {
        info = getTokenInfo(ctx, [node.name, "=", "{"], node.position.start.offset);
    }
    else if (node.kind === "template-literal") {
        info = getTokenInfo(ctx, [node.name, "=", "`"], node.position.start.offset);
    }
    else {
        throw new errors_1.ParseError(`Unknown attr kind: ${node.kind}`, node.position.start.offset, ctx);
    }
    return info.index;
}
exports.calcAttributeValueStartOffset = calcAttributeValueStartOffset;
/**
 * Get end offset of tag
 */
function getEndOffset(node, ctx) {
    if (node.position.end?.offset != null) {
        return node.position.end.offset;
    }
    if (isTag(node))
        return calcTagEndOffset(node, ctx);
    if (node.type === "expression")
        return calcExpressionEndOffset(node, ctx);
    if (node.type === "comment")
        return calcCommentEndOffset(node, ctx);
    if (node.type === "frontmatter") {
        const start = node.position.start.offset;
        return ctx.code.indexOf("---", start + 3) + 3;
    }
    if (node.type === "doctype") {
        const start = node.position.start.offset;
        return ctx.code.indexOf(">", start) + 1;
    }
    if (node.type === "text") {
        const start = node.position.start.offset;
        return start + node.value.length;
    }
    if (node.type === "root") {
        return ctx.code.length;
    }
    throw new Error(`unknown type: ${node.type}`);
}
exports.getEndOffset = getEndOffset;
/**
 * Get content end offset
 */
function calcContentEndOffset(parent, ctx) {
    const code = ctx.code;
    if (isTag(parent)) {
        const end = getEndOffset(parent, ctx);
        if (code[end - 1] !== ">") {
            return end;
        }
        const index = code.lastIndexOf("</", end - 1);
        if (index >= 0 &&
            code.slice(index + 2, end - 1).trim() === parent.name) {
            return index;
        }
        return end;
    }
    else if (parent.type === "expression") {
        const end = getEndOffset(parent, ctx);
        return code.lastIndexOf("}", end);
    }
    else if (parent.type === "root") {
        return code.length;
    }
    throw new Error(`unknown type: ${parent.type}`);
}
exports.calcContentEndOffset = calcContentEndOffset;
/**
 * If the given tag is a self-close tag, get the self-closing tag.
 */
function getSelfClosingTag(node, ctx) {
    if (node.children.length > 0) {
        return null;
    }
    const code = ctx.code;
    const startTagEndOffset = calcStartTagEndOffset(node, ctx);
    if (code.startsWith("/>", startTagEndOffset - 2)) {
        return {
            offset: startTagEndOffset,
            end: "/>",
        };
    }
    if (code.startsWith(`</${node.name}`, startTagEndOffset)) {
        return null;
    }
    return {
        offset: startTagEndOffset,
        end: ">",
    };
}
exports.getSelfClosingTag = getSelfClosingTag;
/**
 * If the given tag has a end tag, get the end tag.
 */
function getEndTag(node, ctx) {
    let beforeIndex;
    if (node.children.length) {
        const lastChild = node.children[node.children.length - 1];
        beforeIndex = getEndOffset(lastChild, ctx);
    }
    else {
        beforeIndex = calcStartTagEndOffset(node, ctx);
    }
    beforeIndex = skipSpaces(ctx.code, beforeIndex);
    if (ctx.code.startsWith(`</${node.name}`, beforeIndex)) {
        const offset = beforeIndex;
        beforeIndex = beforeIndex + 2 + node.name.length;
        const info = getTokenInfo(ctx, [">"], beforeIndex);
        const end = info.index + info.match.length;
        return {
            offset,
            tag: ctx.code.slice(offset, end),
        };
    }
    return null;
}
exports.getEndTag = getEndTag;
/**
 * Get end offset of comment
 */
function calcCommentEndOffset(node, ctx) {
    const info = getTokenInfo(ctx, ["<!--", node.value, "-->"], node.position.start.offset);
    return info.index + info.match.length;
}
exports.calcCommentEndOffset = calcCommentEndOffset;
/**
 * Get end offset of tag
 */
function calcTagEndOffset(node, ctx) {
    let beforeIndex;
    if (node.children.length) {
        const lastChild = node.children[node.children.length - 1];
        beforeIndex = getEndOffset(lastChild, ctx);
    }
    else {
        beforeIndex = calcStartTagEndOffset(node, ctx);
    }
    beforeIndex = skipSpaces(ctx.code, beforeIndex);
    if (ctx.code.startsWith(`</${node.name}`, beforeIndex)) {
        beforeIndex = beforeIndex + 2 + node.name.length;
        const info = getTokenInfo(ctx, [">"], beforeIndex);
        return info.index + info.match.length;
    }
    return beforeIndex;
}
/**
 * Get end offset of Expression
 */
function calcExpressionEndOffset(node, ctx) {
    if (node.children.length) {
        const lastChild = node.children[node.children.length - 1];
        const beforeIndex = getEndOffset(lastChild, ctx);
        const info = getTokenInfo(ctx, ["}"], beforeIndex);
        return info.index + info.match.length;
    }
    const info = getTokenInfo(ctx, ["{", "}"], node.position.start.offset);
    return info.index + info.match.length;
}
/**
 * Get token info
 */
function getTokenInfo(ctx, tokens, position) {
    let lastMatch;
    for (const t of tokens) {
        const index = lastMatch
            ? lastMatch.index + lastMatch.match.length
            : position;
        const m = typeof t === "string"
            ? matchOfStr(t, index)
            : matchOfForMulti(t, index);
        if (m == null) {
            throw new errors_1.ParseError(`Unknown token at ${index}, expected: ${JSON.stringify(t)}, actual: ${JSON.stringify(ctx.code.slice(index, index + 10))}`, index, ctx);
        }
        lastMatch = m;
    }
    return lastMatch;
    /**
     * For string
     */
    function matchOfStr(search, position) {
        const index = search.trim() === search ? skipSpaces(ctx.code, position) : position;
        if (ctx.code.startsWith(search, index)) {
            return {
                match: search,
                index,
            };
        }
        return null;
    }
    /**
     * For multi
     */
    function matchOfForMulti(search, position) {
        for (const s of search) {
            const m = matchOfStr(s, position);
            if (m) {
                return m;
            }
        }
        return null;
    }
}
/**
 * Skip spaces
 */
function skipSpaces(string, position) {
    const re = /\s*/g;
    re.lastIndex = position;
    const match = re.exec(string);
    if (match) {
        return match.index + match[0].length;
    }
    return position;
}
exports.skipSpaces = skipSpaces;
/**
 * Get children
 */
function getSortedChildren(parent, code) {
    if (parent.type === "root" && parent.children[0]?.type === "frontmatter") {
        // The order of comments and frontmatter may be changed.
        const children = [...parent.children];
        if (children.every((n) => n.position)) {
            return children.sort((a, b) => a.position.start.offset - b.position.start.offset);
        }
        let start = skipSpaces(code, 0);
        if (code.startsWith("<!", start)) {
            const frontmatter = children.shift();
            const before = [];
            let first;
            while ((first = children.shift())) {
                start = skipSpaces(code, start);
                if (first.type === "comment" &&
                    code.startsWith("<!--", start)) {
                    start = code.indexOf("-->", start + 4) + 3;
                    before.push(first);
                }
                else if (first.type === "doctype" &&
                    code.startsWith("<!", start)) {
                    start = code.indexOf(">", start + 2) + 1;
                    before.push(first);
                }
                else {
                    children.unshift(first);
                    break;
                }
            }
            return [...before, frontmatter, ...children];
        }
    }
    return parent.children;
}
