
const { widget } = figma;
const { useSyncedState, useEffect, AutoLayout, Text, SVG, Input } = widget;

// Types
interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

// Constants
const COLUMNS = [
  { status: "todo", title: "To Do", color: "#4B5563" },
  { status: "in-progress", title: "In Progress", color: "#2563EB" },
  { status: "done", title: "Done", color: "#16A34A" },
];

const XP_REWARDS = {
  ADD_ISSUE: 10,
  MOVE_ISSUE: 5,
  COMPLETE_ISSUE: 20,
};

const XP_PER_LEVEL = 100;

const PRIORITY_COLORS = {
  low: { bg: "#DEF7EC", text: "#03543F", border: "#9AE6B4" },
  medium: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  high: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
};

// Trophy SVG icon
const TrophySVG = `
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
  <path d="M4 22h16"></path>
  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
</svg>
`;

const ZapSVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" stroke-width="2">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
</svg>
`;

// Character Profile Component
function CharacterProfile({ level, xp, xpToNextLevel }: { level: number; xp: number; xpToNextLevel: number }) {
  const progressPercentage = (xp / xpToNextLevel);

  return (
    <AutoLayout
      direction="vertical"
      spacing={16}
      padding={24}
      fill={{ type: "solid", color: { r: 0.95, g: 0.94, b: 0.98, a: 1 } }}
      cornerRadius={12}
      stroke={{ type: "solid", color: { r: 0.82, g: 0.76, b: 0.95, a: 1 } }}
      strokeWidth={2}
      width="fill-parent"
    >
      <AutoLayout direction="horizontal" spacing={12} width="fill-parent" verticalAlignItems="center">
        {/* Avatar Circle */}
        <AutoLayout
          width={64}
          height={64}
          cornerRadius={32}
          fill={{ type: "solid", color: { r: 0.67, g: 0.51, b: 0.82, a: 1 } }}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          <SVG src={TrophySVG} />
        </AutoLayout>

        {/* Name and Level */}
        <AutoLayout direction="vertical" spacing={4}>
          <Text fontSize={20} fontWeight={600} fill="#111827">Student Hero</Text>
          <AutoLayout
            padding={{ vertical: 2, horizontal: 8 }}
            fill={{ type: "solid", color: { r: 0.94, g: 0.94, b: 0.97, a: 1 } }}
            cornerRadius={4}
          >
            <Text fontSize={12} fill="#374151">Level {level}</Text>
          </AutoLayout>
        </AutoLayout>

        {/* XP Display */}
        <AutoLayout direction="vertical" spacing={2} horizontalAlignItems="end" width="fill-parent">
          <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
            <SVG src={ZapSVG} />
            <Text fontSize={24} fontWeight={700} fill="#CA8A04">{xp}</Text>
          </AutoLayout>
          <Text fontSize={12} fill="#6B7280">XP</Text>
        </AutoLayout>
      </AutoLayout>

      {/* Progress Bar */}
      <AutoLayout direction="vertical" spacing={8} width="fill-parent">
        <AutoLayout direction="horizontal" width="fill-parent">
          <Text fontSize={12} fill="#6B7280">Progress to Level {level + 1}</Text>
          <AutoLayout width="fill-parent" />
          <Text fontSize={12} fill="#6B7280">{xp} / {xpToNextLevel} XP</Text>
        </AutoLayout>

        {/* Progress bar background */}
        <AutoLayout width="fill-parent" height={12} fill="#E5E7EB" cornerRadius={6}>
          <AutoLayout
            width={progressPercentage}
            height={12}
            fill={{ type: "solid", color: { r: 0.67, g: 0.51, b: 0.82, a: 1 } }}
            cornerRadius={6}
          />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

// Issue Card Component
function IssueCard({ issue, onMove }: { issue: Issue; onMove: (issueId: string, newStatus: string) => void }) {
  const priorityColor = PRIORITY_COLORS[issue.priority];

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={16}
      fill="#FFFFFF"
      cornerRadius={8}
      stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
      width="fill-parent"
      strokeWidth={1}
      onClick={() => {
        // Cycle through statuses: todo -> in-progress -> done -> todo
        const statusOrder = ["todo", "in-progress", "done"];
        const currentIndex = statusOrder.indexOf(issue.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        onMove(issue.id, nextStatus);
      }}
    >
      {/* Title */}
      <Text fontSize={14} fontWeight={600} fill="#111827" width="fill-parent">{issue.title}</Text>

      {/* Description */}
      {issue.description && (
        <Text fontSize={12} fill="#6B7280" width="fill-parent">{issue.description}</Text>
      )}

      {/* Footer with priority and date */}
      <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
        <AutoLayout
          padding={{ vertical: 2, horizontal: 8 }}
          fill={priorityColor.bg}
          cornerRadius={4}
          stroke={priorityColor.border}
          strokeWidth={1}
        >
          <Text fontSize={11} fill={priorityColor.text}>{issue.priority}</Text>
        </AutoLayout>

        <AutoLayout width="fill-parent" />

        <Text fontSize={10} fill="#9CA3AF">
          {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

// Kanban Column Component
function KanbanColumn({
  status,
  title,
  issues,
  color,
  onMove,
  onAddIssue
}: {
  status: string;
  title: string;
  issues: Issue[];
  color: string;
  onMove: (issueId: string, newStatus: string) => void;
  onAddIssue: (status: string) => void;
}) {
  // Convert hex color to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255,
      a: 1
    } : { r: 0.5, g: 0.5, b: 0.5, a: 1 };
  };

  const rgb = hexToRgb(color);

  return (
    <AutoLayout
      direction="vertical"
      spacing={0}
      width={500}
      height="hug-contents"
    >
      {/* Column Header */}
      <AutoLayout
        direction="horizontal"
        spacing={8}
        padding={16}
        fill={{ type: "solid", color: rgb }}
        cornerRadius={{ topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 }}
        width="fill-parent"
        verticalAlignItems="center"
      >
        <Text fontSize={16} fontWeight={600} fill="#FFFFFF">{title}</Text>
        <AutoLayout width="fill-parent" />
        <AutoLayout
          padding={{ vertical: 2, horizontal: 8 }}
          fill={{ type: "solid", color: { r: 1, g: 1, b: 1, a: 0.2 } }}
          cornerRadius={4}
        >
          <Text fontSize={12} fill="#FFFFFF">{issues.length}</Text>
        </AutoLayout>
      </AutoLayout>

      {/* Column Body */}
      <AutoLayout
        direction="vertical"
        spacing={12}
        padding={16}
        fill={{ type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } }}
        cornerRadius={{ topLeft: 0, topRight: 0, bottomLeft: 8, bottomRight: 8 }}
        stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
        strokeWidth={2}
        width="fill-parent"
        minHeight={200}
      >
        {issues.length === 0 ? (
          <AutoLayout
            width="fill-parent"
            height={100}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            <Text fontSize={12} fill="#9CA3AF">Click + to add issues</Text>
          </AutoLayout>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} onMove={onMove} />)
        )}

        {/* Add Issue Button */}
        <AutoLayout
          padding={12}
          fill={{ type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } }}
          cornerRadius={6}
          width="fill-parent"
          horizontalAlignItems="center"
          onClick={() => onAddIssue(status)}
        >
          <Text fontSize={14} fontWeight={600} fill="#FFFFFF">+ Add Issue</Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

// Main Widget
function KanbanWidget() {
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

  const handleMove = (issueId: string, newStatus: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue) return;

    const oldStatus = issue.status;
    if (oldStatus === newStatus) return;

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

  const handleAddIssue = (status: string) => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      title: "New Issue",
      description: "Click to edit description",
      status: status,
      priority: "medium",
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
        <Text fontSize={32} fontWeight={700} fill="#111827">Tableau Kanban Étudiant</Text>
        <Text fontSize={14} fill="#6B7280">Complétez les quêtes et améliorez votre personnage!</Text>
      </AutoLayout>

      {/* Character Profile */}
      <CharacterProfile level={level} xp={xp} xpToNextLevel={xpToNextLevel} />

      {/* Kanban Columns */}
      <AutoLayout direction="horizontal" spacing={16}>
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            issues={issues.filter((issue) => issue.status === column.status)}
            color={column.color}
            onMove={handleMove}
            onAddIssue={handleAddIssue}
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(KanbanWidget);
