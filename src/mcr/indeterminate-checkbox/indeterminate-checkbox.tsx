import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { checkboxData, type TCheckDataNode } from "./data";

const CheckboxItem = function ({
    dataNode,
    checkedItems,
    handleCheck,
}: {
    dataNode: TCheckDataNode;
    checkedItems: TCheckedItems;
    handleCheck: (isChecked: boolean, dataNode: TCheckDataNode) => void;
}) {
    let isChecked = checkedItems[dataNode.id]?.checked ?? false;
    let isIndeterminate = checkedItems[dataNode.id]?.indeterminate ?? false;

    if (isChecked) {
        isIndeterminate = false;
    }

    let checkboxType: "check" | "indeterminate" = "check";

    if (isIndeterminate) {
        checkboxType = "indeterminate";
    }

    return (
        <div className="pl-6">
            <div className="mb-2 flex items-center gap-2">
                <Checkbox
                    id={dataNode.id}
                    type={checkboxType}
                    onCheckedChange={(checked) => handleCheck(checked, dataNode)}
                    checked={isChecked || isIndeterminate}
                />
                <Label htmlFor={dataNode.id}>{dataNode.label}</Label>
            </div>
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

type TCheckedItems = Record<string, { checked: boolean; indeterminate: boolean }>;

export default function IndeterminateCheckbox() {
    const [checkedItems, setCheckedItems] = useState<TCheckedItems | {}>({});

    function handleCheck(isChecked: boolean, dataNode: TCheckDataNode) {
        setCheckedItems(function (prev) {
            const cloneCheckedItems: TCheckedItems = structuredClone(prev);

            // 1. Check/Uncheck node and all its childs
            function checkMeAndChildrens(node: TCheckDataNode) {
                if (!cloneCheckedItems[node.id]) {
                    cloneCheckedItems[node.id] = { checked: false, indeterminate: false };
                }

                cloneCheckedItems[node.id].checked = isChecked;
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
                    return cloneCheckedItems[node.id]?.checked ?? false;
                }
            }

            function areAnyChildrenChecked(node: TCheckDataNode): boolean {
                if (node.children && node.children.length > 0) {
                    return node.children.some((child) => areAnyChildrenChecked(child));
                } else {
                    return cloneCheckedItems[node.id]?.checked ?? false;
                }
            }

            // 3. Updates parent nodes as per childrens state
            function updateParentStates(node: TCheckDataNode) {
                if (!node.children || node.children.length === 0) return;

                node.children.forEach(updateParentStates);

                if (!cloneCheckedItems[node.id]) {
                    cloneCheckedItems[node.id] = { checked: false, indeterminate: false };
                }
                cloneCheckedItems[node.id].checked = areAllChildrenChecked(node);
                cloneCheckedItems[node.id].indeterminate = areAnyChildrenChecked(node);
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
