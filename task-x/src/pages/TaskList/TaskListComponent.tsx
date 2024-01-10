import { Fragment, FunctionComponent, useMemo } from "react";
import {
  TaskAlertNotification,
  ContainerCard,
  ContainerCardProps,
  ContainerTask,
} from "../../components";
import { ENGLISH } from "../../constant";
import {
  centerHorizontal,
  colorBlue,
  colorGreen,
  colorRed,
  flexCol,
} from "../../style";
import { Tasks } from "../../@types/task";

const { LABEL } = ENGLISH;

interface TaskListComponentProps {
  taskList: Tasks[] | undefined;
  addTask: (tasks: Tasks) => void;
  updateTaskList: (list: Tasks[]) => void;
  loading: boolean | undefined;
  showAlert: boolean;
}

export const TaskListComponent: FunctionComponent<TaskListComponentProps> = ({
  taskList,
  addTask,
  updateTaskList,
  loading,
  showAlert,
}: TaskListComponentProps) => {
  const isTaskListEmpty = taskList === undefined || taskList.length === 0;

  const completedTask = useMemo(() => {
    const data = isTaskListEmpty
      ? []
      : taskList.filter((eachTask) => eachTask.completed === true);
    return data;
  }, [taskList, isTaskListEmpty]);

  const completedTaskLabel = isTaskListEmpty
    ? "0/0"
    : `${completedTask.length}/${taskList.length}`;

  const recentTask = isTaskListEmpty
    ? []
    : taskList
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.dueDate || "").getTime() -
            new Date(a.dueDate || "").getTime()
        )
        .slice(0, 3);

  const recentTaskLabel = isTaskListEmpty
    ? "0/0"
    : `${recentTask.length}/${taskList.length}`;

  const importantTask = useMemo(() => {
    const data = isTaskListEmpty
      ? []
      : taskList.filter((eachTask) => eachTask.urgency === true);
    return data;
  }, [taskList, isTaskListEmpty]);

  const importantTaskLabel = isTaskListEmpty
    ? "0/0"
    : `${importantTask.length}/${taskList.length}`;

  const cardList: ContainerCardProps[] = [
    {
      label: LABEL.COMPLETED_TASK_LABEL,
      subLabel: completedTaskLabel,
      iconStyle: {
        icon: "checkmark-done-circle",
        color: colorGreen[400],
      },
      currentList: completedTask,
    },
    {
      label: LABEL.RECENT_TASK_LABEL,
      subLabel: recentTaskLabel,
      iconStyle: {
        icon: "today",
        color: colorBlue[900],
      },
      currentList: recentTask,
    },
    {
      label: LABEL.IMPORTANT_TASK_LABEL,
      subLabel: importantTaskLabel,
      iconStyle: { icon: "md-alert", color: colorRed[500] },
      currentList: importantTask,
    },
  ];

  return (
    <Fragment>
      <div className={`${flexCol}`}>
        <div className={`${flexCol} md:flex-row w-full sm:w-full`}>
          {cardList.map((props, index) => {
            return (
              <Fragment key={index}>
                <div className="w-full sm:w-full md:w-full">
                  <ContainerCard {...props} />
                </div>
              </Fragment>
            );
          })}
        </div>
        {showAlert === true && (
          <div className={centerHorizontal} style={{ padding: 30 }}>
            <TaskAlertNotification
              label={LABEL.TASK_ADDED_LABEL}
              subLabel={LABEL.TASK_SUB_LABEL}
              IconStyle={{
                icon: "checkmark-circle",
                size: 24,
                color: "white",
              }}
              visible={showAlert}
            />
          </div>
        )}
        <div>
          <ContainerTask
            loading={loading}
            taskList={taskList}
            addTask={addTask}
            updateTaskList={updateTaskList}
          />
        </div>
      </div>
    </Fragment>
  );
};
