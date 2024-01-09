type TypeStatus = "completed" | "Important";

export declare interface Tasks {
  userId: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  status?: TypeStatus;
  errorTitle?: string;
}
