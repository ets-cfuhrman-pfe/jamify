import { cycleStatus, moveIssue, awardXP, checkLevelUp, safeAssignedStudentId } from '../widget-figjam/widget-src/kanban board/kanban-logic';

describe('kanban-logic', () => {
  test('cycleStatus cycles todo -> in-progress -> done -> todo', () => {
    expect(cycleStatus('todo')).toBe('in-progress');
    expect(cycleStatus('in-progress')).toBe('done');
    expect(cycleStatus('done')).toBe('todo');
  });

  test('moveIssue sets completedAt only when moving to done', () => {
    const base = { id: '1', title: '', description: '', status: 'in-progress', priority: 'low', createdAt: new Date().toISOString(), questId: 'Aucune' } as any;
    const moved = moveIssue(base);
    expect(moved.status).toBe('done');
    expect(typeof moved.completedAt).toBe('string');
    const cycled = moveIssue(moved);
    expect(cycled.status).toBe('todo');
    expect(cycled.completedAt).toBeUndefined();
  });

  test('awardXP adds amount', () => {
    expect(awardXP(95, 5)).toBe(100);
  });

  test('checkLevelUp triggers and rolls over XP at threshold', () => {
    const res = checkLevelUp(100, 1, 100);
    expect(res.leveledUp).toBe(true);
    expect(res.level).toBe(2);
    expect(res.xp).toBe(0);
  });

  test('checkLevelUp can cascade across multiple levels via repeated checks', () => {
    // Use XP high enough to cross two thresholds (100, then 200)
    let r1 = checkLevelUp(300, 1, 100); // -> level 2, xp 200
    expect(r1.leveledUp).toBe(true);
    let r2 = checkLevelUp(r1.xp, r1.level, 100); // -> level 3, xp 0
    expect(r2.leveledUp).toBe(true);
    let r3 = checkLevelUp(r2.xp, r2.level, 100); // -> no level up
    expect(r3.leveledUp).toBe(false);
    expect(r3.level).toBe(3);
    expect(r3.xp).toBe(0);
  });

  test('safeAssignedStudentId handles undefined or negative', () => {
    expect(safeAssignedStudentId(undefined)).toBeUndefined();
    expect(safeAssignedStudentId(-1)).toBeUndefined();
    expect(safeAssignedStudentId(0)).toBe(0);
  });
});
