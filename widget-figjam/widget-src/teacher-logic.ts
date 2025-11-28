export type Quest = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  xp: string;
};

export function newQuest(): Quest {
  return {
    id: `${Date.now()}_${Math.random()}`,
    name: 'Nouvelle mission',
    description: '',
    difficulty: '',
    xp: '',
  };
}

export function addQuest(list: Quest[]): Quest[] {
  return [...list, newQuest()];
}

export function updateQuest(list: Quest[], id: string, field: keyof Quest, value: string): Quest[] {
  return list.map((q) => (q.id === id ? ({ ...q, [field]: value }) as Quest : q));
}

export function deleteQuest(list: Quest[], id: string): Quest[] {
  return list.filter((q) => q.id !== id);
}
