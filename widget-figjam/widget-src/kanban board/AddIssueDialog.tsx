const { widget } = figma;
const { useSyncedState, AutoLayout, Text, Input } = widget;

export function AddIssueDialog({
    status,
    onAdd,
    onCancel,
    studentNames = []
}: {
    status: string;
    onAdd: (title: string, description: string, priority: "low" | "medium" | "high", assignedToId?: number) => void;
    onCancel: () => void;
    studentNames?: string[];
}) {
  const [title, setTitle] = useSyncedState(`newIssueTitle_${status}`, "");
  const [description, setDescription] = useSyncedState(`newIssueDesc_${status}`, "");
  const [priority, setPriority] = useSyncedState<"low" | "medium" | "high">(`newIssuePriority_${status}`, "medium");
  const [showPriorityDropdown, setShowPriorityDropdown] = useSyncedState(`showPriorityDropdown_${status}`, false);

  // 🆕 Quest selection
  const [quests] = useSyncedState("teacherQuests", []); // shared from teacher section
  const [selectedQuest, setSelectedQuest] = useSyncedState(`selectedQuest_${status}`, "");
  const [showQuestDropdown, setShowQuestDropdown] = useSyncedState(`showQuestDropdown_${status}`, false);
  const [assignedToId, setAssignedToId] = useSyncedState<number | null>(`newIssueAssignedTo_${status}`, null);
  const [showStudentDropdown, setShowStudentDropdown] = useSyncedState(`showStudentDropdown_${status}`, false);

  const priorities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

  const getPriorityLabel = (p: "low" | "medium" | "high") => (p === 'low' ? 'bas' : p === 'medium' ? 'moyen' : 'élevé')

  const getAssignedName = () => {
      if (assignedToId == null) return "Non assigné";
      return studentNames[assignedToId] || "Étudiant";
  };

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
            <Text fontSize={14} fontWeight={600} fill="#374151">Nouveau Tâche</Text>

            {/* Title Input */}
            <AutoLayout direction="vertical" spacing={4} width="fill-parent">
                <Text fontSize={12} fill="#6B7280">Titre :</Text>
                <AutoLayout
                    padding={8}
                    fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    width="fill-parent"
                >
                    <Input
                        value={title}
                        placeholder="Entrer le titre de la tâche"
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
            placeholder="Entrer la description"
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
                <Text fontSize={12} fill="#6B7280">Priorité:</Text>
                <AutoLayout
                    padding={8}
                    fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    spacing={4}
                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                >
                    <Text fontSize={12}>{getPriorityLabel(priority)}</Text>
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
                                <Text fontSize={12}>{getPriorityLabel(p)}</Text>
                            </AutoLayout>
                        ))}
                    </AutoLayout>
                )}
            </AutoLayout>

            {/* Student Assignment Dropdown */}
            <AutoLayout direction="vertical" spacing={4} width="fill-parent">
                <Text fontSize={12} fill="#6B7280">Attribuer à :</Text>
                <AutoLayout
                    padding={8}
                    fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                    spacing={4}
                    onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                >
                    <Text fontSize={12}>{getAssignedName()}</Text>
                    <Text fontSize={10}>{showStudentDropdown ? "▲" : "▼"}</Text>
                </AutoLayout>

                {showStudentDropdown && (
                    <AutoLayout
                        direction="vertical"
                        spacing={4}
                        padding={8}
                        fill="#FFFFFF"
                        cornerRadius={4}
                        stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
                        width="fill-parent"
                    >
                        {/* Non assigné option */}
                        <AutoLayout
                            padding={6}
                            fill={assignedToId == null ? { type: "solid", color: { r: 0.8, g: 0.9, b: 1, a: 1 } } : "#FFFFFF"}
                            cornerRadius={4}
                            onClick={() => {
                                setAssignedToId(null);
                                setShowStudentDropdown(false);
                            }}
                            width="fill-parent"
                        >
                            <Text fontSize={12}>Non assigné</Text>
                        </AutoLayout>

                        {/* Student options */}
                        {studentNames.map((name, idx) => (
                            <AutoLayout
                                key={idx}
                                padding={6}
                                fill={assignedToId === idx ? { type: "solid", color: { r: 0.8, g: 0.9, b: 1, a: 1 } } : "#FFFFFF"}
                                cornerRadius={4}
                                onClick={() => {
                                    setAssignedToId(idx);
                                    setShowStudentDropdown(false);
                                }}
                                width="fill-parent"
                            >
                                <Text fontSize={12}>{name}</Text>
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
                    <Text fontSize={12} fontWeight={600} fill="#374151">Annuler</Text>
                </AutoLayout>

                <AutoLayout
                    padding={10}
                    fill={{ type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } }}
                    cornerRadius={6}
                    onClick={() => {
                        if (title.trim()) {
                            onAdd(title, description, priority, assignedToId == null ? undefined : assignedToId);
                            setTitle("");
                            setDescription("");
                            setPriority("medium");
                            setAssignedToId(null);
                            setSelectedQuest("");
                        } else {
                            figma.notify("Please enter a title");
                        }
                    }}
                    width="fill-parent"
                    horizontalAlignItems="center"
                >
                    <Text fontSize={12} fontWeight={600} fill="#FFFFFF">Ajouter une tâche</Text>
                </AutoLayout>
            </AutoLayout>
        </AutoLayout>
    );
}
