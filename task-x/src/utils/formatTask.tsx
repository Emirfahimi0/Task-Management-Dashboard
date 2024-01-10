import { getFormattedDate } from ".";
import { Tasks, TypeStatus } from "../@types/task";

export const taskFormatter = (data: Tasks[] | undefined) => {
  const task = data === undefined ? [] : data;
  const newDate = getFormattedDate();
  const updatedTaskList = task.map((eachTask: Tasks) => ({
    ...eachTask,
    dueDate: newDate,
    status:
      eachTask.completed === true ? "completed" : ("incomplete" as TypeStatus),
  }));

  return updatedTaskList;
};
