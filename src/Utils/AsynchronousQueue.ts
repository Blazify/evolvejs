export class AsyncronousQueue {
  private _promises: QueuePromise[] = [];

  public get resolved(): boolean {
    return this._promises.length === 0;
  }

  public get notResolved(): number {
    return this._promises.length;
  }

  public delay(): Promise<void> {
    const next = this._promises.length
      ? this._promises[this._promises.length - 1].promise
      : Promise.resolve();

    this.enqueue();
    return next;
  }

  public enqueue(): void {
    let resolve!: (value: void) => void;
    const promise = new Promise<void>((res) => {
      resolve = res;
    });

    this._promises.push({ promise, resolve });
  }

  public dequeue(): void {
    const next = this._promises.shift();
    if (next) next.resolve();
  }
}

interface QueuePromise {
  promise: Promise<void>;
  resolve(value: void): void;
}
