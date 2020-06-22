export function transformIfSet<T, R>(value: T|undefined, callback: (v: T) => R): R|undefined {
    return value === undefined
        ? undefined
        : callback(value);
}