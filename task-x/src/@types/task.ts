export type TypeStatus = "completed" | "important" | "recently" | "incomplete";

export declare interface Tasks {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  status: TypeStatus;
  urgency?: boolean;
  errorTitle?: string;
}
