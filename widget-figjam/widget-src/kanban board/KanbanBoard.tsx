// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const figma: any;
const { widget } = figma;
const { useSyncedState, useEffect, AutoLayout, Text } = widget;

import { Issue, Column } from "./types";
import { COLUMNS, XP_REWARDS, XP_PER_LEVEL } from "./constants";
import { moveIssue, awardXP, checkLevelUp, safeAssignedStudentId } from './kanban-logic';
import { CharacterProfile } from "./CharacterProfile";
import { KanbanColumn } from "./KanbanColumn";

// Exported Kanban board component to embed inside main widget
export function KanbanBoard() {
  // Remove generic annotation to avoid TS2347 in editor
  const [issues, setIssues] = useSyncedState("issues", [] as Issue[]);

  // Read the number of students from teacher profile
  const [numberOfStudentsStr] = useSyncedState("teacherNumStudents", "0");
  const numberOfStudents = parseInt(numberOfStudentsStr) || 0;

  // Collect all student names, XP, levels from synced states
  const studentNames: string[] = [];
  const studentXP: number[] = [];
  const studentLevels: number[] = [];
  const setStudentXP: ((value: number) => void)[] = [];
  const setStudentLevels: ((value: number) => void)[] = [];

  for (let i = 0; i < numberOfStudents; i++) {
    const [studentName] = useSyncedState(`student_${i}_name`, `Étudiant ${i + 1}`);
    const [xp, setXp] = useSyncedState(`student_${i}_xp`, 0);
    const [level, setLevel] = useSyncedState(`student_${i}_level`, 1);
    studentNames.push(studentName);
    studentXP.push(xp);
    studentLevels.push(level);
    setStudentXP.push(setXp);
    setStudentLevels.push(setLevel);
  }

  const [xp, setXp] = useSyncedState("xp", 45);
  const [level, setLevel] = useSyncedState("level", 1);
  const [addingToColumn, setAddingToColumn] = useSyncedState(
    "addingToColumn",
    null as string | null
  );

  const xpToNextLevel = level * XP_PER_LEVEL;

  // Level up effect
  useEffect(() => {
    const res = checkLevelUp(xp, level, XP_PER_LEVEL);
    if (res.leveledUp) {
      setLevel(res.level);
      setXp(res.xp);
      try { figma.notify(`🎉 Level Up! You're now Level ${res.level}!`); } catch (_) {}
    }
  });

  const addXP = (amount: number, reason: string) => {
    setXp(awardXP(xp, amount));
    try { figma.notify(`+${amount} XP - ${reason}`); } catch (_) {}
  };

  // Add XP to a specific student
  const addStudentXP = (studentId: number | undefined, amount: number) => {
    const sid = safeAssignedStudentId(studentId);
    if (sid === undefined) return; // No student assigned

    const currentXP = studentXP[sid];
    const currentLevel = studentLevels[sid];
    const xpToNextLevel = currentLevel * XP_PER_LEVEL;

    const newXP = awardXP(currentXP, amount);
    setStudentXP[sid](newXP);

    // Check for level up
    if (newXP >= xpToNextLevel) {
      setStudentLevels[sid](currentLevel + 1);
      setStudentXP[sid](newXP - xpToNextLevel);
      try {
        figma.notify(`🎉 ${studentNames[sid]} leveled up to level ${currentLevel + 1}!`);
      } catch (_) { }
    }
  };

  const handleMove = (issueId: string) => {
    const issue = issues.find((i: Issue) => i.id === issueId);
    if (!issue) return;

    //Vérifie si la tâche est déjà terminée
    if (issue.status === "done") {
      // Feedback sur Figma pour l'utilisateur
      try {
        figma.notify("Cette tâche est déjà terminée.");
      } catch (_) { }
      return;
    }

    const updatedIssues = issues.map((i: Issue) => (i.id === issueId ? moveIssue(i) : i));
    setIssues(updatedIssues);

    const newStatus = updatedIssues.find((i: Issue) => i.id === issueId)?.status;
    if (newStatus === "done") {
      addXP(XP_REWARDS.COMPLETE_ISSUE, "Issue completed");
      addStudentXP(issue.assignedToId, XP_REWARDS.COMPLETE_ISSUE);
    } else {
      addXP(XP_REWARDS.MOVE_ISSUE, "Issue moved");
      addStudentXP(issue.assignedToId, XP_REWARDS.MOVE_ISSUE);
    }
  };

  const handleAddIssue = (
    status: string,
    title: string,
    description: string,
    priority: "low" | "medium" | "high",
    selectedQuest: string,
    assignedToId?: number,
  ) => {
    const newId = Math.random().toString();
    const newIssue: Issue = {
      id: newId,
      title,
      description,
      status,
      priority,
      createdAt: new Date().toISOString(),
      questId: selectedQuest || "Aucune",
      assignedToId: assignedToId,
    };
    setIssues(issues.concat([newIssue]));
    addXP(XP_REWARDS.ADD_ISSUE, "Issue created");
    addStudentXP(assignedToId, XP_REWARDS.ADD_ISSUE);
  };

  const handleDelete = (issueId: string) => {
    const updatedIssues = issues.filter((i: Issue) => i.id !== issueId);
    setIssues(updatedIssues);
    try {
      figma.notify("✅ Tâche supprimée");
    } catch (_) { }
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
          Tâches
        </Text>
        <Text fontSize={14} fill="#6B7280">
          Complétez les missions et améliorez votre personnage!
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
            onDelete={handleDelete}
            addingToColumn={addingToColumn}
            setAddingToColumn={setAddingToColumn}
            onAddIssue={handleAddIssue}
            studentNames={studentNames}
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}
