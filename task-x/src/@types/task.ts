export type TypeStatus = "completed" | "important" | "recently" | "incomplete";

export declare interface Tasks {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  description?: string;
  status: TypeStatus;
  urgency?: boolean;
  errorTitle?: string;
  errorDescription?: string;
}
