import { useEffect, type RefObject } from "react";

type UseClickOutsideProps = {
    ref: RefObject<HTMLDivElement | null>;
    callback: () => void;
    enabled: boolean;
};

export function useClickOutside({ ref, callback, enabled }: UseClickOutsideProps) {
    useEffect(
        function () {
            function handleClick(e: MouseEvent) {
                if (enabled && ref.current && !ref.current.contains(e.target as Node)) callback();
            }

            document.addEventListener("mousedown", handleClick);

            return function () {
                document.removeEventListener("mousedown", handleClick);
            };
        },
        [enabled, ref, callback],
    );
}
