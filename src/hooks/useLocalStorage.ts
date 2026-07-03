import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(function () {
        try {
            const stored = localStorage.getItem(key);

            return stored !== null ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(state));
        },
        [key, state],
    );

    return [state, setState] as const;
}
