import { useState } from "react";

import { checkboxData, type TCheckDataNode } from "./data";

const CheckboxItem = function ({
    dataNode,
    checkedItems,
    handleCheck,
}: {
    dataNode: TCheckDataNode;
    checkedItems: Record<string, boolean>;
    handleCheck: (isChecked: boolean, dataNode: TCheckDataNode) => void;
}) {
    return (
        <div className="space-x-2 pl-6">
            <input
                type="checkbox"
                id={dataNode.id}
                onChange={(e) => handleCheck(e.target.checked, dataNode)}
                checked={checkedItems[dataNode.id] ?? false}
            />
            <label htmlFor={dataNode.id}>{dataNode.label}</label>
            {dataNode.children &&
                dataNode.children.map(function (dataNode2) {
                    return (
                        <CheckboxItem
                            key={dataNode2.id}
                            dataNode={dataNode2}
                            checkedItems={checkedItems}
                            handleCheck={handleCheck}
                        />
                    );
                })}
        </div>
    );
};

export default function NestedCheckbox() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    function handleCheck(isChecked: boolean, dataNode: TCheckDataNode) {
        setCheckedItems(function (prev) {
            const cloneCheckedItems = { ...prev };

            // 1. Check/Uncheck node and all its childs
            function checkMeAndChildrens(node: TCheckDataNode) {
                cloneCheckedItems[node.id] = isChecked;
                if (node.children) {
                    node.children.forEach(checkMeAndChildrens);
                }
            }
            checkMeAndChildrens(dataNode);

            // 2. Returns true if all children of a node are checked
            function areAllChildrenChecked(node: TCheckDataNode): boolean {
                if (node.children && node.children.length > 0) {
                    return node.children.every((child) => areAllChildrenChecked(child));
                } else {
                    return cloneCheckedItems[node.id] ?? false;
                }
            }

            // 3. Updates parent nodes as per childrens state
            function updateParentStates(node: TCheckDataNode) {
                if (!node.children || node.children.length === 0) return;

                node.children.forEach(updateParentStates);
                cloneCheckedItems[node.id] = areAllChildrenChecked(node);
            }

            checkboxData.forEach(updateParentStates);

            return cloneCheckedItems;
        });
    }

    return (
        <div className="bg-muted border p-4">
            <div>
                <h1 className="text-primary mb-4 text-center text-2xl font-bold">
                    Nested Checkbox
                </h1>
            </div>
            {checkboxData.map(function (dataNode) {
                return (
                    <CheckboxItem
                        key={dataNode.id}
                        dataNode={dataNode}
                        checkedItems={checkedItems}
                        handleCheck={handleCheck}
                    />
                );
            })}
        </div>
    );
}
