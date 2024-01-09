import {
  CSSProperties,
  ChangeEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import {
  TaskAlertNotification,
  CustomButtonAction,
  CustomInputText,
  TaskList,
  ContainerCard,
} from "../components";
import { ENGLISH } from "../constant";
import {
  centerHW,
  centerHorizontal,
  centerText,
  colorBlue,
  colorGreen,
  colorRed,
  flexCol,
  fullWidth,
} from "../style";
import { CirclesWithBar } from "react-loader-spinner";
import { Tasks } from "../@types/task";
import { getFormattedDate } from "../utils";
import { useTaskList } from "../context";

const { LABEL, TASK, INPUT } = ENGLISH;

export const TaskListComponent = () => {
  const [task, setTask] = useState<Tasks>({
    userId: 1,
    title: "",
    errorTitle: undefined,
    completed: false,
    dueDate: "",
  });
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const { taskList, addTask, showAlert, setExistingTaskList } = useTaskList();

  const { title, errorTitle } = task;

  const headerTitleStyle = `md:container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 ${centerText}`;
  const currentDate = getFormattedDate();

  const handleOnBlurTask = () => {
    let error = "";

    if (title.trim() === "") {
      error = TASK.ERROR_TITLE_BLANK;
      return setTask({ ...task, ...{ errorTitle: error } });
    }
    if (title.length < 10) {
      error = TASK.ERROR_TITLE_LENGTH;
      return setTask({ ...task, ...{ errorTitle: error } });
    }
    return setTask({
      ...task,
      ...{ dueDate: currentDate },
    });
  };

  const handleOnChangeTask = (event: ChangeEvent<HTMLInputElement>) => {
    return setTask({
      ...task,
      ...{ title: event.target.value, errorTitle: undefined },
    });
  };

  const handleOnFocusTask = () => {
    return setTask({ ...task, ...{ errorTitle: undefined } });
  };

  const handleAddTask = () => {
    addTask({ ...task });
    return setTask({
      userId: 0,
      title: "",
      errorTitle: undefined,
      completed: false,
      dueDate: "",
    });
  };

  const handleFetchTaskList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = (await response.json()) as Tasks[];

      const updatedTaskList = data.map((eachTask) => {
        return { ...eachTask, dueDate: currentDate };
      });
      setExistingTaskList(updatedTaskList);
      // For user experience
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const completedTask =
    taskList === undefined || taskList.length === 0
      ? []
      : taskList.filter((eachTask) => eachTask.completed === true).length;

  const completedTaskLabel =
    taskList === undefined || taskList.length === 0
      ? `0/0`
      : `${completedTask}/${taskList.length}`;

  const disableContinue = !!(
    errorTitle ||
    title.trim() === "" ||
    title.length < 10
  );

  useEffect(() => {
    handleFetchTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className={centerHW}>
        <div className="xl:px-12">
          <div className="flex  flex-col md:flex-row w-full justify-between py-12">
            <ContainerCard
              label="Completed Task"
              subLabel={completedTaskLabel}
              iconStyle={{
                icon: "checkmark-done-circle",
                color: colorGreen[400],
              }}
            />
            <ContainerCard
              label="Recently Task"
              subLabel="0/10"
              iconStyle={{
                icon: "today",
                color: colorBlue[900],
              }}
            />
            <ContainerCard
              label="Important Task"
              subLabel="2/10"
              iconStyle={{
                icon: "md-alert",
                color: colorRed[500],
              }}
            />
          </div>
          {showAlert && (
            <div className={centerHorizontal} style={{ padding: 30 }}>
              <TaskAlertNotification
                label={LABEL.TASK_ADDED_LABEL}
                subLabel="Make sure to finish your task accordingly!"
                IconStyle={{
                  icon: "checkmark-circle",
                  size: 24,
                  color: "white",
                }}
                visible={showAlert}
              />
            </div>
          )}

          <div
            className={`container ${flexCol} p-4 md:shadow-2xl`}
            style={{ borderRadius: 8 }}
          >
            <div className={headerTitleStyle}>
              <h1 className="text-2xl font-medium text-gray-700">
                {LABEL.TITLE_HEADER}
              </h1>
            </div>
            {loading === true ? (
              <div className={centerHorizontal}>
                <CirclesWithBar
                  height="50"
                  width="50"
                  color={colorGreen[600]}
                  ariaLabel="circles-with-bar-loading"
                  visible={loading}
                />
              </div>
            ) : (
              <Fragment>
                <div
                  className={`flex sm:flex-row justify-between ${fullWidth} gap-4 py-2`}
                >
                  <CustomInputText
                    onBlur={handleOnBlurTask}
                    spaceBetweenText={"p-2"}
                    value={title}
                    error={errorTitle}
                    onFocus={handleOnFocusTask}
                    onChange={handleOnChangeTask}
                    placeholder={INPUT.PLACE_HOLDER}
                  />
                  <div>
                    <CustomButtonAction
                      disabledContinue={disableContinue}
                      backgroundColor={"bg-green-600"}
                      textColor={"white"}
                      iconStyle={{
                        icon: "add-circle",
                        size: 20,
                      }}
                      customStyle={buttonStyle}
                      onPress={handleAddTask}
                    />
                  </div>
                </div>

                {taskList === undefined ? (
                  <div />
                ) : (
                  <Fragment>
                    {taskList.map((props, index) => {
                      return (
                        <Fragment>
                          <div className="py-4">
                            <TaskList key={index} {...props} />
                          </div>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const buttonStyle: CSSProperties = {
  backgroundColor: colorGreen[400],
  borderRadius: 12,
};
