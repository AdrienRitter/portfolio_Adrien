"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LruCache = void 0;
class LruCache extends Map {
    constructor(capacity) {
        super();
        this.capacity = capacity;
    }
    get(key) {
        if (!this.has(key)) {
            return undefined;
        }
        const value = super.get(key);
        this.set(key, value);
        return value;
    }
    set(key, value) {
        this.delete(key);
        super.set(key, value);
        if (this.size > this.capacity) {
            this.deleteOldestEntry();
        }
        return this;
    }
    deleteOldestEntry() {
        for (const entry of this) {
            this.delete(entry[0]);
            return;
        }
    }
}
exports.LruCache = LruCache;
