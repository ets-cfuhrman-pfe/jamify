const { widget } = figma;
const { useSyncedState, useEffect, AutoLayout, Text } = widget;

// Import types
import { Issue, Column } from "./types";

// Import constants
import { COLUMNS, XP_REWARDS, XP_PER_LEVEL } from "./constants";

// Import components
import { CharacterProfile } from "./CharacterProfile";
import { KanbanColumn } from "./KanbanColumn";

// Exported Kanban board component to embed inside main widget
export function KanbanBoard() {
  const [issues, setIssues] = useSyncedState<Issue[]>("issues", [
    {
      id: "1",
      title: "Setup project repository",
      description: "Initialize the project with all necessary dependencies",
      status: "done",
      priority: "high",
      createdAt: new Date("2025-01-19").toISOString(),
    },
    {
      id: "2",
      title: "Design database schema",
      description: "Create the initial database design for the application",
      status: "in-progress",
      priority: "high",
      createdAt: new Date("2025-01-20").toISOString(),
    },
    {
      id: "3",
      title: "Implement user authentication",
      description: "Add login and registration functionality",
      status: "todo",
      priority: "medium",
      createdAt: new Date("2025-01-21").toISOString(),
    },
    {
      id: "4",
      title: "Write unit tests",
      description: "Add test coverage for core components",
      status: "todo",
      priority: "low",
      createdAt: new Date("2025-01-21").toISOString(),
    },
  ]);

  const [xp, setXp] = useSyncedState("xp", 45);
  const [level, setLevel] = useSyncedState("level", 1);
  const [addingToColumn, setAddingToColumn] = useSyncedState<string | null>(
    "addingToColumn",
    null
  );

  const xpToNextLevel = level * XP_PER_LEVEL;

  // Level up effect
  useEffect(() => {
    if (xp >= xpToNextLevel) {
      setLevel(level + 1);
      setXp(xp - xpToNextLevel);
      figma.notify(`🎉 Level Up! You're now Level ${level + 1}!`);
    }
  });

  const addXP = (amount: number, reason: string) => {
    setXp(xp + amount);
    figma.notify(`+${amount} XP - ${reason}`);
  };

  const handleMove = (issueId: string) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    //Vérifie si la tâche est déjà terminée
    if (issue.status === "done") {
      // Feedback sur Figma pour l'utilisateur
      try {
        figma.notify("Cette tâche est déjà terminée.");
      } catch (_) {}
      return;
    }

    // Cycle through statuses: todo -> in-progress -> done -> todo
    const statusOrder = ["todo", "in-progress", "done"];
    const currentIndex = statusOrder.indexOf(issue.status);
    const newStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

    if (issue.status === newStatus) return;

    const updatedIssues = issues.map((i) =>
      i.id === issueId ? Object.assign({}, i, { status: newStatus }) : i
    );
    setIssues(updatedIssues);

    if (newStatus === "done") {
      addXP(XP_REWARDS.COMPLETE_ISSUE, "Issue completed");
    } else {
      addXP(XP_REWARDS.MOVE_ISSUE, "Issue moved");
    }
  };

  const handleAddIssue = (
    status: string,
    title: string,
    description: string,
    priority: "low" | "medium" | "high"
  ) => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      title: title,
      description: description,
      status: status,
      priority: priority,
      createdAt: new Date().toISOString(),
    };
    setIssues(issues.concat([newIssue]));
    addXP(XP_REWARDS.ADD_ISSUE, "Issue created");
  };

  return (
    <AutoLayout
      direction="vertical"
      spacing={32}
      padding={32}
      fill={{ type: "solid", color: { r: 0.97, g: 0.98, b: 0.99, a: 1 } }}
      cornerRadius={16}
      width="hug-contents"
      height="hug-contents"
    >
      {/* Header */}
      <AutoLayout direction="vertical" spacing={8} width="fill-parent">
        <Text fontSize={32} fontWeight={700} fill="#111827">
          Missions
        </Text>
        <Text fontSize={14} fill="#6B7280">
          Complétez les quêtes et améliorez votre personnage!
        </Text>
      </AutoLayout>

      {/* Kanban Columns */}
      <AutoLayout direction="horizontal" spacing={16}>
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            column={column}
            issues={issues}
            onMove={handleMove}
            addingToColumn={addingToColumn}
            setAddingToColumn={setAddingToColumn}
            onAddIssue={handleAddIssue}
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}
