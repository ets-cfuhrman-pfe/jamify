// Types
export interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export interface Column {
  status: string;
  title: string;
  color: string;
}
