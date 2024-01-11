import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ContainerCard,
  TaskAlertNotification,
  ContainerCardProps,
} from "../../components";
import {
  flexCol,
  centerHorizontal,
  colorBlue,
  colorGreen,
  colorRed,
} from "../../style";
import { ENGLISH } from "../../constant";
import { Tasks, TypeStatus } from "../../@types/task";
import { getFormattedDate } from "../../utils";
import { TaskFormComponent } from "./TaskFormComponent";

const { LABEL, TASK } = ENGLISH;

export interface CreateTaskListProps {
  addTask: (tasks: Tasks) => void;
  showAlert: boolean;
  taskList: Tasks[] | undefined;
  updateTaskList: (list: Tasks[]) => void;
  setExistingTaskList: (list: Tasks[]) => void;
}

export const CreateTaskList: FunctionComponent<CreateTaskListProps> = ({
  ...props
}: CreateTaskListProps) => {
  const { taskList, showAlert, addTask } = props;

  const [task, setTask] = useState<Tasks>({
    id: 1,
    title: "",
    completed: false,
    description: "",
    status: "completed",
    dueDate: "",
  });
  const { title, description } = task;
  const selection = useRef<HTMLSelectElement>(null);

  const currentDate = getFormattedDate();

  const handleOnBlurTitle = () => {
    let error = "";

    if (!title || title.trim() === "") {
      error = TASK.ERROR_TITLE_BLANK;
      return setTask({ ...task, ...{ errorTitle: error } });
    }
    if (title.length < 10) {
      error = TASK.ERROR_TITLE_LENGTH_LESS;
      return setTask({ ...task, ...{ errorTitle: error } });
    }
    if (title.length > 25) {
      error = TASK.ERROR_TITLE_LENGTH_MORE;
      return setTask({ ...task, ...{ errorTitle: error } });
    }
    return setTask({
      ...task,
    });
  };
  const handleOnBlurDescription = () => {
    let error = "";

    if (!description || description.trim() === "") {
      error = TASK.ERROR_DESCRIPTION_BLANK;
      return setTask({ ...task, ...{ errorDescription: error } });
    }

    if (description.length < 10) {
      error = TASK.ERROR_DESCRIPTION_LENGTH_LESS;
      return setTask({ ...task, ...{ errorDescription: error } });
    }

    if (description.length > 25) {
      error = TASK.ERROR_DESCRIPTION_LENGTH_MORE;
      return setTask({ ...task, ...{ errorDescription: error } });
    }

    return setTask({
      ...task,
    });
  };

  const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    return setTask({
      ...task,
      ...{ title: event.target.value, errorTitle: undefined },
    });
  };

  const handleOnChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    return setTask({
      ...task,
      ...{ description: event.target.value, errorDescription: undefined },
    });
  };

  const handleOnFocusTitle = () => {
    return setTask({ ...task, ...{ errorTitle: undefined } });
  };
  const handleOnFocusDescription = () => {
    return setTask({ ...task, ...{ errorDescription: undefined } });
  };

  const handleAddTask = () => {
    const newUpdatedList =
      taskList === undefined || taskList.length === 0
        ? 0
        : taskList.reduce(
            (max, current) => (current.id > max ? current.id : max),
            0
          );

    const selectedStatus =
      selection.current?.value || ("complete" as TypeStatus);
    addTask({
      ...task,
      id: newUpdatedList,
      completed: selectedStatus === "complete",
      urgency: selectedStatus === "important",
      status: selectedStatus === "important" ? "important" : "incomplete",
      dueDate: currentDate,
    });

    setTask({
      id: 0,
      title: "",
      completed: false,
      description: "",
      status: "incomplete",
      dueDate: "",
    });
  };

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
      <div className={flexCol}>
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
        <div className=" flex flex-1" style={{ borderRadius: 8 }}>
          <TaskFormComponent
            handleOnBlurTitle={handleOnBlurTitle}
            handleOnBlurDescription={handleOnBlurDescription}
            handleOnChangeTitle={handleOnChangeTitle}
            handleOnChangeDescription={handleOnChangeDescription}
            handleOnFocusTitle={handleOnFocusTitle}
            handleOnFocusDescription={handleOnFocusDescription}
            handleSubmit={handleAddTask}
            value={task}
            ref={selection}
          />
        </div>
      </div>
    </Fragment>
  );
};
