// Types
export interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  completedAt?: string; // Date when the issue was marked as done
  questId: string | null;
  assignedToId?: number; // Index of the assigned student
}

export interface Column {
  status: string;
  title: string;
  color: string;
}
