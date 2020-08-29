export class Objex<K, V>  extends Map<K, V> {
	private array: [K, V][] | null = [];
	private valueArray: V[] | null = [];
	private keyArray: K[] | null = [];
	public ['constructor']: typeof Objex;

	/**
	 * Creates a new Objex collection
	 * @param {[K, V][]} [entries] - The pre-defined values to add to Objex
	 */
	public constructor(entries?: [K, V][]) {
		super(entries!);
	}

	/**
	 * Get the size of the collection
	 * @returns {Number} The size of the collection
	 */
	public get size(): number {
		return super.size;
	}

	/**
	 * Set a new entry in the Objex collection
	 * @param {K} key - The key of the entry 
	 * @param value - The value of the entry
	 * @returns {Objex} The Objex class instance
	 */
	public set(key: K, value: V): this {
		this.keyArray = this.valueArray = this.array = null;
		return super.set(key, value);
	}

	/**
	 * Get a value from the Objex collection
	 * @param {K} key - The key to get
	 * @returns {V | undefined} The value or `undefined` if no value found
	 */
	public get(key: K): V | undefined {
		return super.get(key);
	}

	/**
	 * Checks if an entry exists
	 */
	public has(key: K): boolean {
		return super.has(key);
	}

	/**
	 * Delete an element from the Objex
	 * @returns {boolean} If the element was deleted
	 */
	public delete(key: K): boolean {
		this.keyArray = this.valueArray = this.array = null;
		return super.delete(key);
	}

	/**
	 * Clears the whole Objex collection
	 */
	public clear(): void {
		this.keyArray = this.valueArray = this.array = null;
		return super.clear();
	}

	/**
	 * Fetch the first value(s) from the Objex 
	 * @param {number} [amount=0] - The number of values from the beginning
	 * @returns {V | V[] | undefined} A single value or an array of values if a number was provided
	 */
	public first(amount: number = 0): V | V[] | undefined {
		const mapIter = this.values();
		if (!amount || isNaN(amount) || amount < 0) return mapIter.next().value;

		amount = Math.min(amount, this.size);
		return Array.from({ length: amount }, (): V => mapIter.next().value);
	}

	/**
	 * Fetch the last value(s) from the Objex 
	 * @param {number} [amount=0] - The number of values from the end
	 * @returns {V | V[] | undefined} A single value or an array of values if a number was provided
	 */
	public last(amount: number = 0): V | V[] | undefined {
		const vArray = this.vArray();
		if (!amount || isNaN(amount) || amount < 0)
			return vArray[vArray.length - 1];

		amount = Math.min(amount, this.size);
		return vArray.slice(-amount);
	}

	/**
	 * Fetch the first key(s) from the Objex 
	 * @param {number} [amount=0] - The number of keys from the beginning
	 * @returns {K | K[] | undefined} A single key or an array of keys if a number was provided
	 */
	public firstKey(amount: number = 0): K | K[] | undefined {
		const keyIter = this.keys();
		if (!amount || isNaN(amount) || amount < 0) return keyIter.next().value;

		amount = Math.min(amount, this.size);
		return Array.from({ length: amount }, (): K => keyIter.next().value);
	}

	/**
	 * Fetch the last key(s) from the Objex 
	 * @param {number} [amount=0] - The number of keys from the end
	 * @returns {K | K[] | undefined} A single key or an array of keys if a number was provided
	 */
	public lastKey(amount: number = 0): K | K[] | undefined {
		const kArray = this.kArray();
		if (!amount || isNaN(amount) || amount < 0)
			return kArray[kArray.length - 1];

		amount = Math.min(amount, this.size);
		return kArray.slice(-amount);
	}

	/**
	 * Get a `[key, value]` pair array of the Objex
	 * @returns {[K, V][]} The array of all the entries
	 */
	public toArray(): [K, V][] {
		if (this.array!.length !== this.size) this.array = [ ...this.entries() ];
		return this.array!;
	}

	/**
	 * Get an array of all the Objex values
	 * @returns {V[]} The array of all the values
	 */
	public vArray(): V[] {
		if (this.valueArray!.length !== this.size)
			this.valueArray = [ ...this.values() ];
		return this.valueArray!;
	}

	/**
	 * Get an array of all the Objex keys
	 * @returns {K[]} The array of all the keys
	 */
	public kArray(): K[] {
		if (this.keyArray!.length !== this.size) this.keyArray = [ ...this.keys() ];
		return this.keyArray!;
	}

	/**
	 * Let's you run a function on each Objex element
	 * @param func - The function that is to be ran on each element
	 * @returns {T[]} The final result in an array
	 */
	public map<T>(func: (val: V, key: K, objex: this) => T): T[] {
		const raw = this.entries();
		return Array.from({ length: this.size }, (): T => {
			const [ key, value ] = raw.next().value;
			return func(value, key, this);
		});
	}

	/**
	 * Filters the elements that passes a test
	 * @param {Function} func - The function that needs to be satisfied 
	 * @returns {Objex} The filtered Objex collection
	 */
	public filter<T>(func: (val: V, key: K, objex: this) => boolean): this {
		const filtered = new this.constructor[Symbol.species]<K, V>() as this;
		for (let [ key, value ] of this) {
			if (func(value, key, this)) filtered.set(key, value);
		}
		return filtered;
	}

	/**
	 * Find an element value that passes a test
	 * @param {Function} func - The function that needs to be satisfied 
	 * @returns {V | undefined} The value or `undefined` if none found
	 */
	public find<T>(
		func: (val: V, key: K, objex: this) => boolean
	): V | undefined {
		for (let [ key, value ] of this) {
			if (func(value, key, this)) return value;
		}
		return undefined;
	}

	//public some<T>(func: ())
}
