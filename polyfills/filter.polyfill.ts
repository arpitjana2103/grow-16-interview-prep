declare global {
    interface Array<T> {
        myFilter: <T>(
            cb: (value: T, index?: number, array?: ArrayLike<T>) => boolean,
            thisArg?: unknown,
        ) => T[];
    }
}

Array.prototype.myFilter = function <T>(
    this: ArrayLike<T>,
    cb: (value: T, index?: number, array?: ArrayLike<T>) => boolean,
    thisArg: unknown,
) {
    // Hanlde if `this` is null | undefined
    // Ex : Array.prototype.myFilter.call(null, () => true);
    // Ex : Array.prototype.myFilter.call(undefined, () => true);
    if (this === null) {
        throw new TypeError("can't convert null to object");
    }
    if (this === undefined) {
        throw new TypeError("can't convert undefined to object");
    }

    // Handle if cb is not a function
    // Ex : arr.myFilter<number>(5 as never)
    if (typeof cb !== "function") {
        console.error("callback received !:", cb);
        throw new TypeError(`expecting 'type: function' as callback`);
    }

    const result = new Array<T>();

    let index = 0;

    // Handle if `this` is not an object
    // Ex : Array.prototype.myFilter.call(5 as never, () => true)
    // Ex : Array.prototype.myFilter.call("string", () => true)
    const _this = Object(this);

    while (index < this.length) {
        // Handle Missing Element : Sparse Array holes
        // Ex : [1, , 3].myFilter(() => true)
        if (!(index in _this)) {
            index++;
            continue;
        }

        // Skip the index if it's not a direct property of `this`
        // !! Array.prototype.filter don't handles it so we can skip it

        // if (!this.hasOwnProperty(index)) {
        //     index++;
        //     continue;
        // }

        // Add desired element into result array
        if (cb.call(thisArg, this[index], index, this)) {
            result.push(this[index]);
        }

        index++;
    }

    return result;
};

/*
const filterCb = function (ele: number) {
    return ele > 2;
};

const res = [1, 2, 3, 4, 5].filter(filterCb);
console.log(res);
// Output : [3, 4, 5]

// Edge Case 0 ////////////////////////////////////
Array.prototype.filter.call(null, () => true);
// Output : (Error) can't convert null to object

Array.prototype.filter.call(undefined, () => true);
// Output : (Error) can't convert undefined to object

// Edge Case 1 ////////////////////////////////////
Array.prototype.filter(5 as never, () => true);
// Oudput : 5 is not a function

// Edge case 2 ////////////////////////////////////
Array.prototype.filter.call({}, () => true);
Array.prototype.filter.call([], () => true);
// Output : []

// Edge case 3 ////////////////////////////////////
const arrayLikeObj = { length: 3, 0: 1, 1: 2 };
Object.setPrototypeOf(arrayLikeObj, { 2: 3 });
Array.prototype.filter.call(arrayLikeObj, () => true);
// Output : [1, 2, 3]

// Edge case 4 ////////////////////////////////////
Array.prototype.filter.call("string", () => true);
// Output : ["s", "t", "r", "i", "n", "g"]

// Edge case 5 ////////////////////////////////////
[1, , 3].filter(() => true);
// Output : [1, 3]

Array.from({ length: 3 }).filter(() => true);
// Output : [undefined, undefined, undefined]

new Array(3).filter(() => true);
// Output : []
*/
