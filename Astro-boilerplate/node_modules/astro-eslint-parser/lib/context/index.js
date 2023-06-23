"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizedLineFeed = exports.LinesAndColumns = exports.Context = void 0;
class Context {
    constructor(code) {
        this.locsMap = new Map();
        this.state = {};
        this.locs = new LinesAndColumns(code);
        this.code = code;
    }
    getLocFromIndex(index) {
        let loc = this.locsMap.get(index);
        if (!loc) {
            loc = this.locs.getLocFromIndex(index);
            this.locsMap.set(index, loc);
        }
        return {
            line: loc.line,
            column: loc.column,
        };
    }
    /**
     * Get the location information of the given indexes.
     */
    getLocations(start, end) {
        return {
            range: [start, end],
            loc: {
                start: this.getLocFromIndex(start),
                end: this.getLocFromIndex(end),
            },
        };
    }
    /**
     * Build token
     */
    buildToken(type, range) {
        return {
            type,
            value: this.getText(range),
            ...this.getLocations(...range),
        };
    }
    /**
     * get text
     */
    getText(range) {
        return this.code.slice(range[0], range[1]);
    }
    get originalAST() {
        return this.state.originalAST;
    }
    set originalAST(originalAST) {
        this.state.originalAST = originalAST;
    }
}
exports.Context = Context;
class LinesAndColumns {
    constructor(origCode) {
        const len = origCode.length;
        const lineStartIndices = [0];
        const crs = [];
        let normalizedCode = "";
        for (let index = 0; index < len;) {
            const c = origCode[index++];
            if (c === "\r") {
                const next = origCode[index++] || "";
                if (next === "\n") {
                    normalizedCode += next;
                    crs.push(index - 2);
                    lineStartIndices.push(index);
                }
                else {
                    normalizedCode += `\n${next}`;
                    lineStartIndices.push(index - 1);
                }
            }
            else {
                normalizedCode += c;
                if (c === "\n") {
                    lineStartIndices.push(index);
                }
            }
        }
        this.lineStartIndices = lineStartIndices;
        //
        this.normalizedLineFeed = new NormalizedLineFeed(normalizedCode, crs);
    }
    getLocFromIndex(index) {
        const lineNumber = sortedLastIndex(this.lineStartIndices, index);
        return {
            line: lineNumber,
            column: index - this.lineStartIndices[lineNumber - 1],
        };
    }
    getIndexFromLoc(loc) {
        const lineStartIndex = this.lineStartIndices[loc.line - 1];
        const positionIndex = lineStartIndex + loc.column;
        return positionIndex;
    }
    getNormalizedLineFeed() {
        return this.normalizedLineFeed;
    }
}
exports.LinesAndColumns = LinesAndColumns;
class NormalizedLineFeed {
    constructor(code, offsets) {
        this.code = code;
        this.offsets = offsets;
        if (offsets.length) {
            const cache = {};
            this.remapIndex = (index) => {
                let result = cache[index];
                if (result != null) {
                    return result;
                }
                result = index;
                for (const offset of offsets) {
                    if (offset < result) {
                        result++;
                    }
                    else {
                        break;
                    }
                }
                return (cache[index] = result);
            };
        }
        else {
            this.remapIndex = (i) => i;
        }
    }
    get needRemap() {
        return this.offsets.length > 0;
    }
}
exports.NormalizedLineFeed = NormalizedLineFeed;
/**
 * Uses a binary search to determine the highest index at which value should be inserted into array in order to maintain its sort order.
 */
function sortedLastIndex(array, value) {
    let lower = 0;
    let upper = array.length;
    while (lower < upper) {
        const mid = Math.floor(lower + (upper - lower) / 2);
        const target = array[mid];
        if (target < value) {
            lower = mid + 1;
        }
        else if (target > value) {
            upper = mid;
        }
        else {
            return mid + 1;
        }
    }
    return upper;
}
