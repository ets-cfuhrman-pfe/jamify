// Types
export interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  assignedToId?: number; // Index of the assigned student
}

export interface Column {
  status: string;
  title: string;
  color: string;
}
