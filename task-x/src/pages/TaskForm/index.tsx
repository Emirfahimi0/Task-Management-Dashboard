import {
  CSSProperties,
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
  CustomButtonAction,
  CustomInputText,
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

const { LABEL, TASK, INPUT, FORM } = ENGLISH;

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
  const { title, errorTitle, errorDescription, description } = task;
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

  const disableContinue = !!(
    errorDescription ||
    errorTitle ||
    title.trim() === "" ||
    description!.trim() === "" ||
    description!.length < 10 ||
    title.length < 10 ||
    title.length > 25 ||
    (errorDescription && errorDescription.length < 25)
  );

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
          <Fragment>
            <div
              className="container py-4 shadow-md md:shadow-2xl mt-2"
              style={{ borderRadius: 8 }}
            >
              <div className="p-6">
                <h1 className="text-xl font-semibold mb-4 text-gray-700">
                  {FORM.CREATE_TASK_TITLE_LABEL}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {FORM.CREATE_TASK_SUB_LABEL}
                </p>
                <Fragment>
                  <div className="mb-4">
                    <CustomInputText
                      onBlur={handleOnBlurTitle}
                      spaceBetweenText={"p-2"}
                      value={title}
                      error={errorTitle}
                      onFocus={handleOnFocusTitle}
                      onChange={handleOnChangeTitle}
                      placeholder={INPUT.TITLE_PLACE_HOLDER}
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      className="border p-2 rounded w-full"
                      ref={selection}
                    >
                      <option value={"important"}>
                        {FORM.OPTION_IMPORTANT_LABEL}
                      </option>
                      <option value={"complete"}>
                        {FORM.OPTION_COMPLETE_LABEL}
                      </option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <CustomInputText
                      onBlur={handleOnBlurDescription}
                      spaceBetweenText={"p-2"}
                      value={description}
                      error={errorDescription}
                      onFocus={handleOnFocusDescription}
                      onChange={handleOnChangeDescription}
                      placeholder={INPUT.DESCRIPTION_PLACE_HOLDER}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <CustomButtonAction
                      disabledContinue={disableContinue}
                      textColor={"white"}
                      iconStyle={{
                        icon: "add-circle",
                        size: 20,
                      }}
                      label="Add new task"
                      customStyle={buttonStyle}
                      onPress={handleAddTask}
                    />
                  </div>
                </Fragment>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};
const buttonStyle: CSSProperties = {
  backgroundColor: colorGreen[400],
  borderRadius: 12,
};
