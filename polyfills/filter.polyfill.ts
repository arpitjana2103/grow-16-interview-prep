declare global {
    interface Array<T> {
        myFilter: <T>(
            cb: (value: T, index?: number, array?: T[]) => boolean,
            thisArg?: unknown,
        ) => T[];
    }
}

Array.prototype.myFilter = function <T>(
    this: T[],
    cb: (value: T, index?: number, array?: T[]) => boolean,
    thisArg: unknown,
) {
    const result = new Array<T>();

    let index = 0;

    while (index < this.length) {
        if (cb.call(thisArg, this[index])) {
            result.push(this[index]);
        }

        index++;
    }

    return result;
};

const filterCb = function (ele: number) {
    return ele > 2;
};

const arr = [1, 2, 3, 4, 5];
const filtered = arr.filter(filterCb);

const filtered2 = arr.myFilter<number>(filterCb);

console.log(filtered);
console.log(filtered2);
