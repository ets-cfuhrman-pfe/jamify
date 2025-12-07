import { overrideSyncedState } from './setup-figma';

// Import components (will execute function bodies when called)
import { StudentProfile } from '../widget-figjam/widget-src/code';
import { KanbanBoard } from '../widget-figjam/widget-src/kanban board/KanbanBoard';

describe('component execution smoke', () => {
  test('StudentProfile editing + view modes execute', () => {
    // Editing mode
    const editingMapping = {
      student_0_name: 'Étudiant 1',
      student_0_class: 'Rôdeur',
      student_0_xp: 0,
      student_0_level: 1,
      student_0_ui: { showAvatarSelector: false, showClassDropdown: false, isEditing: true },
    };
    overrideSyncedState(editingMapping);
    expect(() => StudentProfile({ studentId: 0 })).not.toThrow();

    // View mode
    const viewMapping = { ...editingMapping, student_0_ui: { showAvatarSelector: false, showClassDropdown: false, isEditing: false } };
    overrideSyncedState(viewMapping);
    expect(() => StudentProfile({ studentId: 0 })).not.toThrow();
  });

  // Skip TeacherProfile for now due to TS generics from widget API in tests

  test('KanbanBoard executes with level-up path', () => {
    const mapping = {
      issues: [
        { id: 'i1', title: 'Issue 1', description: '', status: 'todo', priority: 'low', createdAt: new Date().toISOString(), questId: 'Aucune', assignedToId: 0 },
      ],
      teacherNumStudents: '1',
      student_0_name: 'Étudiant 1',
      student_0_xp: 95,
      student_0_level: 1,
      xp: 100, // trigger global level-up
      level: 1,
      addingToColumn: null
    };
    overrideSyncedState(mapping);
    expect(() => KanbanBoard()).not.toThrow();
  });
});
