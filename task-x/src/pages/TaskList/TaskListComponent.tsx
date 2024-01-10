import { Fragment, FunctionComponent } from "react";
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
  const isTaskListExist = taskList === undefined || taskList.length === 0;

  const completedTask = isTaskListExist
    ? []
    : taskList.filter((eachTask) => eachTask.completed === true);

  const completedTaskLabel = isTaskListExist
    ? "0/0"
    : `${completedTask.length}/${taskList.length}`;

  const recentTask = isTaskListExist
    ? []
    : taskList
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.dueDate || "").getTime() -
            new Date(a.dueDate || "").getTime(),
        )
        .slice(0, 3);

  const recentTaskLabel = isTaskListExist
    ? "0/0"
    : `${recentTask.length}/${taskList.length}`;

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
      subLabel: "2/10",
      iconStyle: { icon: "md-alert", color: colorRed[500] },
      currentList: recentTask,
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center">
        <div className={`${flexCol} md:flex-row w-full sm:w-full`}>
          {cardList.map((props, index) => {
            return (
              <Fragment key={index}>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
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
        <div className="w-full">
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
