import { useState } from "react";

type Props = {
    data: { id: string; label: string; component: React.ReactNode }[];
};

export default function Tabs({ data }: Props) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    return (
        <div role="tabList">
            <ul className="flex gap-2">
                {data.map(function (d, i) {
                    return (
                        <li
                            key={d.id}
                            className="border"
                            role="tab"
                            aria-selected={i === activeIndex}
                        >
                            <button onClick={() => setActiveIndex(i)}>{d.label}</button>
                        </li>
                    );
                })}
            </ul>
            <div role="tabPanel">{data[activeIndex].component}</div>
        </div>
    );
}
