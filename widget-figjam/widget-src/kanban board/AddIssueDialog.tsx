const { widget } = figma;
const { useSyncedState, AutoLayout, Text, Input } = widget;

export function AddIssueDialog({
  status,
  onAdd,
  onCancel,
}: {
  status: string;
  onAdd: (title: string, description: string, priority: "low" | "medium" | "high", questName: string | null) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useSyncedState(`newIssueTitle_${status}`, "");
  const [description, setDescription] = useSyncedState(`newIssueDesc_${status}`, "");
  const [priority, setPriority] = useSyncedState<"low" | "medium" | "high">(`newIssuePriority_${status}`, "medium");
  const [showPriorityDropdown, setShowPriorityDropdown] = useSyncedState(`showPriorityDropdown_${status}`, false);

  // 🆕 Quest selection
  const [quests] = useSyncedState("teacherQuests", []); // shared from teacher section
  console.log("Available quests in AddIssueDialog:", quests);
  const [selectedQuest, setSelectedQuest] = useSyncedState(`selectedQuest_${status}`, "");
  const [questName, setQuestName] = useSyncedState(`questName_${status}`, "");
  const [showQuestDropdown, setShowQuestDropdown] = useSyncedState(`showQuestDropdown_${status}`, false);

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
      <Text fontSize={14} fontWeight={600} fill="#374151">
        New Issue
      </Text>

      {/* Title */}
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <Text fontSize={12} fill="#6B7280">Title:</Text>
        <AutoLayout
          padding={8}
          fill="#FAFAFA"
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

      {/* Description */}
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <Text fontSize={12} fill="#6B7280">Description:</Text>
        <AutoLayout
          padding={8}
          fill="#FAFAFA"
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

      {/* 🆕 Quest Dropdown */}
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <Text fontSize={12} fill="#6B7280">Quest:</Text>
        <AutoLayout
          padding={8}
          fill="#FAFAFA"
          cornerRadius={4}
          stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
          spacing={4}
          onClick={() => setShowQuestDropdown(!showQuestDropdown)}
        >
          <Text fontSize={12}>
            {selectedQuest
              ? quests.find((q) => q.id === selectedQuest)?.name || "Unknown Quest"
              : "Select a quest"}
          </Text>
          <Text fontSize={10}>{showQuestDropdown ? "▲" : "▼"}</Text>
        </AutoLayout>

        {showQuestDropdown && quests.length > 0 && (
          <AutoLayout
            direction="vertical"
            spacing={4}
            padding={8}
            fill="#FFFFFF"
            cornerRadius={4}
            stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
            width="fill-parent"
          >
            {quests.map((q) => (
              <AutoLayout
                key={q.id}
                padding={6}
                fill={selectedQuest === q.id ? "#E0ECFF" : "#FFFFFF"}
                cornerRadius={4}
                onClick={() => {
                  setSelectedQuest(q.id);
                  setQuestName(q.name);
                  setShowQuestDropdown(false);
                }}
                width="fill-parent"
              >
                <Text fontSize={12}>{q.name || "Unnamed Quest"}</Text>
              </AutoLayout>
            ))}
          </AutoLayout>
        )}

        {showQuestDropdown && quests.length === 0 && (
          <Text fontSize={12} fill="#999">
            No quests available.
          </Text>
        )}
      </AutoLayout>

      {/* Priority Dropdown */}
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <Text fontSize={12} fill="#6B7280">Priority:</Text>
        <AutoLayout
          padding={8}
          fill="#FAFAFA"
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
                fill={priority === p ? "#E0ECFF" : "#FFFFFF"}
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
          fill="#EEE"
          cornerRadius={6}
          onClick={onCancel}
          width="fill-parent"
          horizontalAlignItems="center"
        >
          <Text fontSize={12} fontWeight={600} fill="#374151">Annuler</Text>
        </AutoLayout>

        <AutoLayout
          padding={10}
          fill={{ type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } }}
          cornerRadius={6}
          onClick={() => {
            if (questName === "" || questName === null) {
              figma.notify("Veuillez sélectionner une quête");
            } else if (title.trim()) {
              onAdd(title, description, priority, questName);
              setTitle("");
              setDescription("");
              setPriority("medium");
              setSelectedQuest("");
              setQuestName("");
            } else {
              figma.notify("Please enter a title");
            }
          }}
          width="fill-parent"
          horizontalAlignItems="center"
        >
          <Text fontSize={12} fontWeight={600} fill="#FFFFFF">Sauvegarder</Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}
