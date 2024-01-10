import { FunctionComponent } from "react";
import { useTaskList } from "../context";

import { TaskListPage } from "./TaskList";

export const DashBoard: FunctionComponent = () => {
  const { taskList, addTask, showAlert, setExistingTaskList, updateTaskList } =
    useTaskList();

  const taskListProps = {
    taskList,
    addTask,
    showAlert,
    setExistingTaskList,
    updateTaskList,
  };

  return <TaskListPage {...taskListProps} />;
};
