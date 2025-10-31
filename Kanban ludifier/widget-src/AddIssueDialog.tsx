const { widget } = figma;
const { useSyncedState, AutoLayout, Text, Input } = widget;

// Add Issue Dialog Component
export function AddIssueDialog({
    status,
    onAdd,
    onCancel
}: {
    status: string;
    onAdd: (title: string, description: string, priority: "low" | "medium" | "high") => void;
    onCancel: () => void;
}) {
    const [title, setTitle] = useSyncedState(`newIssueTitle_${status}`, "");
    const [description, setDescription] = useSyncedState(`newIssueDesc_${status}`, "");
    const [priority, setPriority] = useSyncedState<"low" | "medium" | "high">(`newIssuePriority_${status}`, "medium");
    const [showPriorityDropdown, setShowPriorityDropdown] = useSyncedState(`showPriorityDropdown_${status}`, false);

    const priorities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

    return (
        <AutoLayout
            direction="vertical"
            spacing={12}
            padding={16}
            fill="#FFFFFF"
            cornerRadius={8}
            stroke={{ type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } }}
            strokeWidth={2}
            width="fill-parent"
        >
            <Text fontSize={14} fontWeight={600} fill="#374151">New Issue</Text>

            {/* Title Input */}
            <AutoLayout direction="vertical" spacing={4} width="fill-parent">
                <Text fontSize={12} fill="#6B7280">Title:</Text>
                <AutoLayout
                    padding={8}
                    fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    width="fill-parent"
                >
                    <Input
                        value={title}
                        placeholder="Enter issue title"
                        onTextEditEnd={(e) => setTitle(e.characters)}
                        fontSize={12}
                        width="fill-parent"
                    />
                </AutoLayout>
            </AutoLayout>

            {/* Description Input */}
            <AutoLayout direction="vertical" spacing={4} width="fill-parent">
                <Text fontSize={12} fill="#6B7280">Description:</Text>
                <AutoLayout
                    padding={8}
                    fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    width="fill-parent"
                >
                    <Input
                        value={description}
                        placeholder="Enter description"
                        onTextEditEnd={(e) => setDescription(e.characters)}
                        fontSize={12}
                        width="fill-parent"
                    />
                </AutoLayout>
            </AutoLayout>

            {/* Priority Dropdown */}
            <AutoLayout direction="vertical" spacing={4} width="fill-parent">
                <Text fontSize={12} fill="#6B7280">Priority:</Text>
                <AutoLayout
                    padding={8}
                    fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    spacing={4}
                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                >
                    <Text fontSize={12}>{priority}</Text>
                    <Text fontSize={10}>{showPriorityDropdown ? "▲" : "▼"}</Text>
                </AutoLayout>

                {showPriorityDropdown && (
                    <AutoLayout
                        direction="vertical"
                        spacing={4}
                        padding={8}
                        fill="#FFFFFF"
                        cornerRadius={4}
                        stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                        width="fill-parent"
                    >
                        {priorities.map((p) => (
                            <AutoLayout
                                key={p}
                                padding={6}
                                fill={priority === p ? { type: "solid", color: { r: 0.8, g: 0.9, b: 1, a: 1 } } : "#FFFFFF"}
                                cornerRadius={4}
                                onClick={() => {
                                    setPriority(p);
                                    setShowPriorityDropdown(false);
                                }}
                                width="fill-parent"
                            >
                                <Text fontSize={12}>{p}</Text>
                            </AutoLayout>
                        ))}
                    </AutoLayout>
                )}
            </AutoLayout>

            {/* Buttons */}
            <AutoLayout direction="horizontal" spacing={8} width="fill-parent">
                <AutoLayout
                    padding={10}
                    fill={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    cornerRadius={6}
                    onClick={onCancel}
                    width="fill-parent"
                    horizontalAlignItems="center"
                >
                    <Text fontSize={12} fontWeight={600} fill="#374151">Cancel</Text>
                </AutoLayout>

                <AutoLayout
                    padding={10}
                    fill={{ type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } }}
                    cornerRadius={6}
                    onClick={() => {
                        if (title.trim()) {
                            onAdd(title, description, priority);
                            setTitle("");
                            setDescription("");
                            setPriority("medium");
                        } else {
                            figma.notify("Please enter a title");
                        }
                    }}
                    width="fill-parent"
                    horizontalAlignItems="center"
                >
                    <Text fontSize={12} fontWeight={600} fill="#FFFFFF">Add Issue</Text>
                </AutoLayout>
            </AutoLayout>
        </AutoLayout>
    );
}
