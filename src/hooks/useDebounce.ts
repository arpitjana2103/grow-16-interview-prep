import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 1000): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    // Without UseEffect Version

    // const fn = useCallback(debounce(setDebouncedValue, delay), []);
    // fn(value);

    return debouncedValue;
}

// Without useEffect

// function debounce<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
//     let timerId: ReturnType<typeof setTimeout>;

//     return (...args: T): void => {
//         clearTimeout(timerId);

//         timerId = setTimeout(() => {
//             callback(...args);
//         }, delay);
//     };
// }
