import { addQuest, updateQuest, deleteQuest, newQuest } from '../widget-figjam/widget-src/teacher-logic';

describe('teacher-logic', () => {
  test('addQuest appends a new default quest', () => {
    const list = [] as ReturnType<typeof newQuest>[];
    const res = addQuest(list);
    expect(res.length).toBe(1);
    expect(res[0].name).toBe('Nouvelle mission');
  });

  test('updateQuest updates specified field', () => {
    const q = newQuest();
    const res = updateQuest([q], q.id, 'name', 'Mission 1');
    expect(res[0].name).toBe('Mission 1');
  });

  test('deleteQuest removes by id', () => {
    const a = newQuest();
    const b = newQuest();
    const res = deleteQuest([a, b], a.id);
    expect(res.length).toBe(1);
    expect(res[0].id).toBe(b.id);
  });
});
