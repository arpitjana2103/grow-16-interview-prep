declare global {
    interface Array<T> {
        myMap: <T, U>(cb: (value: T, index: number, array: T[]) => U, thisArg?: unknown) => U[];
    }
}

Array.prototype.myMap = function <T, U>(
    this: T[],
    cb: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown,
): U[] {
    const result: U[] = Array.from({ length: this.length });

    let index = 0;

    while (index < this.length) {
        result[index] = cb.apply(thisArg, [this[index], index, this]);
        index++;
    }

    return result;
};

// const sq = function (value: number): number {
//     return value * value;
// };

const st = function (value: number): string {
    return String(value);
};

const arr = new Array<number>(1, 2, 3, 4);

console.log("arr value : ", arr);

const res1 = arr.map(st);
const res2 = arr.myMap<number, string>(st);

console.log(res1);
console.log(res2);
