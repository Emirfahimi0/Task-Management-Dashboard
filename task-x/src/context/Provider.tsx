import { ReactNode, createContext, useContext, useState } from "react";
import { Tasks } from "../@types/task";

type TypeTaskListProvider = {
  children: ReactNode;
};

interface TaskListProviderContextProps {
  taskList: Tasks[] | undefined;
  showAlert: boolean;
  setExistingTaskList: (list: Tasks[]) => void;
  addTask: (tasks: Tasks) => void;
}

const TaskListContext = createContext<TaskListProviderContextProps | undefined>(
  undefined
);

const { Provider } = TaskListContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskList = () => {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error("useTaskList must be used within a TaskListProvider");
  }
  return context;
};

export const TaskListProvider = ({ children }: TypeTaskListProvider) => {
  const [taskList, setTaskList] = useState<Tasks[] | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const setExistingTaskList = (value: Tasks[]) => {
    const updatedValue = value.slice(0, 10);
    setTaskList(updatedValue);
  };

  const addTask = async (task: Tasks) => {
    setTaskList((prevTaskList) => [...prevTaskList!, task]);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const contextValue: TaskListProviderContextProps = {
    taskList,
    showAlert,
    setExistingTaskList,
    addTask,
  };

  return <Provider value={contextValue}>{children}</Provider>;
};
