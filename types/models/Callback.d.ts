export interface Callback<T> {
    (error: string, result: T): any;
}
