import { COLUMNS, XP_REWARDS, XP_PER_LEVEL, PRIORITY_COLORS, TrophySVG, ZapSVG } from '../widget-figjam/widget-src/kanban board/constants';

describe('kanban constants', () => {
  test('columns have expected statuses and titles', () => {
    expect(COLUMNS.map(c => c.status)).toEqual(['todo','in-progress','done']);
    expect(COLUMNS.map(c => c.title)).toEqual(['À faire','En cours','Terminé']);
  });

  test('xp rewards numeric values', () => {
    expect(XP_REWARDS).toMatchObject({ ADD_ISSUE: 10, MOVE_ISSUE: 5, COMPLETE_ISSUE: 20 });
  });

  test('priority colors keys', () => {
    expect(Object.keys(PRIORITY_COLORS)).toEqual(['low','medium','high']);
  });

  test('svg strings are non-empty', () => {
    expect(TrophySVG.trim().startsWith('<svg')).toBe(true);
    expect(ZapSVG.trim().startsWith('<svg')).toBe(true);
  });
});
