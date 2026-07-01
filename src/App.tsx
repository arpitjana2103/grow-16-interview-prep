// import "./../polyfills/map.polyfill";

import Tabs from "./MCR/Tabs/Tabs";

const data = [
    { id: "A", label: "TabA", component: <TabA /> },
    { id: "B", label: "TabB", component: <TabB /> },
    { id: "C", label: "TabC", component: <TabC /> },
];

function App() {
    return (
        <>
            <Tabs data={data} />
        </>
    );
}

function TabA() {
    return (
        <div>
            <h1 className="text-3xl">Title A</h1>
            <p>
                Description A : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                perferendis, voluptatem ex commodi distinctio voluptates temporibus magni similique
                dolorem! Laborum optio neque itaque ipsam doloremque nam ipsa mollitia corporis
                ratione!
            </p>
        </div>
    );
}

function TabB() {
    return (
        <div>
            <h1 className="text-3xl">Title B</h1>
            <p>
                Description A : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                perferendis, voluptatem ex commodi distinctio voluptates temporibus magni similique
                dolorem! Laborum optio neque itaque ipsam doloremque nam ipsa mollitia corporis
                ratione!
            </p>
        </div>
    );
}

function TabC() {
    return (
        <div>
            <h1 className="text-3xl">Title C</h1>
            <p>
                Description A : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                perferendis, voluptatem ex commodi distinctio voluptates temporibus magni similique
                dolorem! Laborum optio neque itaque ipsam doloremque nam ipsa mollitia corporis
                ratione!
            </p>
        </div>
    );
}

export default App;
