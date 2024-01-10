import {
  CSSProperties,
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import { centerHorizontal, centerText, colorGreen, fullWidth } from "../style";
import { CustomButtonAction, CustomInputText, TaskList } from ".";
import { CirclesWithBar } from "react-loader-spinner";
import { ENGLISH } from "../constant";
import { Tasks, TypeStatus } from "../@types/task";
import { getFormattedDate } from "../utils";

const { LABEL, TASK, INPUT } = ENGLISH;

interface ContainerTaskProps {
  loading: boolean | undefined;
  taskList: Tasks[] | undefined;
  addTask: (value: Tasks) => void;
  updateTaskList: (value: Tasks[]) => void;
}

export const ContainerTask: FunctionComponent<ContainerTaskProps> = ({
  loading,
  taskList,
  addTask,
  updateTaskList,
}: ContainerTaskProps) => {
  const [task, setTask] = useState<Tasks>({
    id: 1,
    title: "",
    errorTitle: undefined,
    completed: false,
    status: "completed",
    dueDate: "",
  });

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
    const newUpdatedList =
      taskList === undefined || taskList?.length === 0
        ? 0
        : taskList.reduce(
            (max, current) => (current.id > max ? current.id : max),
            0,
          );

    addTask({
      ...task,
      id: newUpdatedList,
      completed: false,
      status: "incomplete",
    });
    return setTask({
      id: 0,
      title: "",
      errorTitle: undefined,
      completed: false,
      status: "incomplete",
      dueDate: "",
    });
  };

  const disableContinue = !!(
    errorTitle ||
    title.trim() === "" ||
    title.length < 10
  );

  return (
    <Fragment>
      <div
        className=" container p-4 md:shadow-2xl mt-4"
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
                  const handleDeleteTask = (id: number) => {
                    const newTaskList =
                      taskList === undefined || taskList.length === 0
                        ? []
                        : taskList.filter((eachList) => eachList.id !== id);

                    updateTaskList(newTaskList);
                  };

                  const handleMarkCompleteTask = () => {
                    const updatedTaskList = [...taskList];
                    updatedTaskList[index] = {
                      ...taskList[index],
                      completed: !props.completed,
                      status: !props.completed
                        ? "completed"
                        : ("incomplete" as TypeStatus),
                    };

                    updateTaskList(updatedTaskList);
                  };
                  return (
                    <Fragment key={`${index}+${props.id}`}>
                      <div className="py-4">
                        <TaskList
                          {...props}
                          handleDelete={() => handleDeleteTask(props.id)}
                          handleMarkComplete={handleMarkCompleteTask}
                          key={index}
                        />
                      </div>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const buttonStyle: CSSProperties = {
  backgroundColor: colorGreen[400],
  borderRadius: 12,
};
