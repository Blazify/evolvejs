declare module '@evolvejs/objex' {
	export class Objex<K, V> extends Map<K, V> {
		private array;
		private valueArray;
		private keyArray;
		['constructor']: typeof Objex;

		constructor(entries?: [K, V][]);
		/**
     * Get the size of the collection
     * @returns {Number} The size of the collection
     */
		get size(): number;
		/**
     * Set a new entry in the Objex collection
     * @param {K} key - The key of the entry
     * @param value - The value of the entry
     * @returns {Objex} The Objex class instance
     */
		set(key: K, value: V): this;
		/**
     * Get a value from the Objex collection
     * @param {K} key - The key to get
     * @returns {V | undefined} The value or `undefined` if no value found
     */
		get(key: K): V | undefined;
		/**
     * Checks if an entry exists
     */
		has(key: K): boolean;
		/**
     * Delete an element from the Objex
     * @returns {boolean} If the element was deleted
     */
		delete(key: K): boolean;
		/**
     * Clears the whole Objex collection
     */
		clear(): void;
		/**
     * Fetch the first value(s) from the Objex
     * @param {number} [amount=0] - The number of values from the beginning
     * @returns {V | V[] | undefined} A single value or an array of values if a number was provided
     */
		first(amount?: number): V | V[] | undefined;
		/**
     * Fetch the last value(s) from the Objex
     * @param {number} [amount=0] - The number of values from the end
     * @returns {V | V[] | undefined} A single value or an array of values if a number was provided
     */
		last(amount?: number): V | V[] | undefined;
		/**
     * Fetch the first key(s) from the Objex
     * @param {number} [amount=0] - The number of keys from the beginning
     * @returns {K | K[] | undefined} A single key or an array of keys if a number was provided
     */
		firstKey(amount?: number): K | K[] | undefined;
		/**
     * Fetch the last key(s) from the Objex
     * @param {number} [amount=0] - The number of keys from the end
     * @returns {K | K[] | undefined} A single key or an array of keys if a number was provided
     */
		lastKey(amount?: number): K | K[] | undefined;
		/**
     * Get a `[key, value]` pair array of the Objex
     * @returns {[K, V][]} The array of all the entries
     */
		toArray(): [K, V][];
		/**
     * Get an array of all the Objex values
     * @returns {V[]} The array of all the values
     */
		vArray(): V[];
		/**
     * Get an array of all the Objex keys
     * @returns {K[]} The array of all the keys
     */
		kArray(): K[];
		/**
     * Let's you run a function on each Objex element
     * @param func - The function that is to be ran on each element
     * @returns {T[]} The final result in an array
     */
		map<T>(func: (val: V, key: K, objex: this) => T): T[];
		/**
     * Filters the elements that passes a test
     * @param {Function} func - The function that needs to be satisfied
     * @returns {Objex} The filtered Objex collection
     */
		filter<T>(func: (val: V, key: K, objex: this) => boolean): this;
		/**
     * Find an element value that passes a test
     * @param {Function} func - The function that needs to be satisfied
     * @returns {V | undefined} The value or `undefined` if none found
     */
		find<T>(func: (val: V, key: K, objex: this) => boolean): V | undefined;
	}
}
