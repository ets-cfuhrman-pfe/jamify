// kanban-logic.ts
import { Issue } from './types';

export const STATUS_ORDER = ['todo', 'in-progress', 'done'] as const;

export function cycleStatus(status: string): string {
  const idx = STATUS_ORDER.indexOf(status as any);
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
}

export function moveIssue(issue: Issue): Issue {
  const newStatus = cycleStatus(issue.status);
  return {
    ...issue,
    status: newStatus,
    completedAt: newStatus === 'done' ? new Date().toISOString() : undefined,
  };
}

export function awardXP(currentXP: number, amount: number): number {
  return currentXP + amount;
}

export function checkLevelUp(xp: number, level: number, xpPerLevel: number) {
  const threshold = level * xpPerLevel;
  if (xp >= threshold) {
    return { xp: xp - threshold, level: level + 1, leveledUp: true };
  }
  return { xp, level, leveledUp: false };
}

export function safeAssignedStudentId(id: number | undefined): number | undefined {
  return typeof id === 'number' && id >= 0 ? id : undefined;
}
