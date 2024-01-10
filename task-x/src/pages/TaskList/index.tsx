import { FunctionComponent, useEffect, useState } from "react";
import { TaskListComponent } from "./TaskListComponent";
import { Tasks } from "../../@types/task";
import { taskFormatter } from "../../utils";

interface TaskListPageProps {
  addTask: (tasks: Tasks) => void;
  showAlert: boolean;
  taskList: Tasks[] | undefined;
  updateTaskList: (list: Tasks[]) => void;
  setExistingTaskList: (list: Tasks[]) => void;
}

export const TaskListPage: FunctionComponent<TaskListPageProps> = ({
  ...props
}: TaskListPageProps) => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const { setExistingTaskList, taskList } = props;

  const handleFetchTaskList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "GET",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = (await response.json()) as Tasks[];

      const updatedTaskList = taskFormatter(data);
      setExistingTaskList(updatedTaskList);
      // For user experience
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (taskList === undefined) {
      handleFetchTaskList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <TaskListComponent {...props} loading={loading} />;
};
