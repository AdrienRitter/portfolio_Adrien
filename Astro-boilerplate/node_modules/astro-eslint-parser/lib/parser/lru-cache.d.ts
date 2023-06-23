export declare class LruCache<K, V> extends Map<K, V> {
    private readonly capacity;
    constructor(capacity: number);
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    private deleteOldestEntry;
}
