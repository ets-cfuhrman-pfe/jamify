// Global figma widget API stubs for unit testing logic paths
// Provide lightweight mock implementations so component functions can execute.

declare global {
  // eslint-disable-next-line no-var
  var figma: any;
}

import { jest } from '@jest/globals';

function createUseSyncedStateMock(mapping: Record<string, any>) {
  const impl = <T,>(key: string, initial: T): [T, (value: T) => void] => {
    const value = Object.prototype.hasOwnProperty.call(mapping, key) ? mapping[key] as T : initial;
    return [value, jest.fn() as (value: T) => void];
  };
  return jest.fn(impl);
}

// Default mapping used for most tests (can be overridden inside a test)
const defaultMapping: Record<string, any> = {
  xp: 100, // trigger level-up branch in KanbanBoard
  level: 1,
  teacherNumStudents: '2',
  student_0_name: 'Étudiant 1',
  student_0_xp: 95,
  student_0_level: 1,
  student_1_name: 'Étudiant 2',
  student_1_xp: 10,
  student_1_level: 1,
  addingToColumn: null,
  student_0_class: 'Rôdeur',
  student_0_ui: { showAvatarSelector: false, showClassDropdown: false, isEditing: true },
  teacherClaimed: true,
  teacherCanEdit: true,
  teacherIsEditing: true,
  teacherQuests: [
    { id: 'q1', name: 'Mission Alpha', description: 'Desc', difficulty: 'Facile', xp: '50' }
  ],
  expandedQuest: 'q1',
  postIts: [],
};

global.figma = {
  widget: {
    useSyncedState: createUseSyncedStateMock(defaultMapping),
    useEffect: jest.fn(),
    AutoLayout: jest.fn(),
    Text: jest.fn(),
    Input: jest.fn(),
    Image: jest.fn(),
  },
  currentUser: { id: 'user1', name: 'Test User' },
  notify: jest.fn(),
  showUI: jest.fn(),
  closePlugin: jest.fn(),
  ui: { onmessage: jest.fn() },
  register: jest.fn(),
};

export function overrideSyncedState(mapping: Record<string, any>) {
  global.figma.widget.useSyncedState = createUseSyncedStateMock(mapping);
}
