import { Fragment, FunctionComponent } from "react";
import { centerHorizontal, centerText, colorGreen } from "../style";
import { CirclesWithBar } from "react-loader-spinner";
import { ENGLISH } from "../constant";
import { Tasks, TypeStatus } from "../@types/task";
import { TaskCard } from "./TaskList/TaskCard";

const { LABEL } = ENGLISH;

interface ContainerTaskProps {
  loading: boolean | undefined;
  taskList: Tasks[] | undefined;
  updateTaskList: (value: Tasks[]) => void;
}

export const ContainerTask: FunctionComponent<ContainerTaskProps> = ({
  loading,
  updateTaskList,
  taskList,
}: ContainerTaskProps) => {
  const headerTitleStyle = `md:container p-4 sm:p-6 md:p-8 lg:p-10 ${centerText}`;

  return (
    <Fragment>
      <div
        className=" container p-4 shadow-md md:shadow-2xl mt-4"
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
            {taskList === undefined ? null : (
              <Fragment>
                {taskList.map((props, index) => {
                  const handleImportantTask = () => {
                    const updatedTaskList = [...taskList];
                    updatedTaskList[index] = {
                      ...taskList[index],
                      urgency: !props.urgency,
                      status: "important",
                    };

                    updateTaskList(updatedTaskList);
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

                  const handleDeleteTask = (id: number) => {
                    const newTaskList =
                      taskList === undefined || taskList.length === 0
                        ? []
                        : taskList.filter((eachList) => eachList.id !== id);

                    updateTaskList(newTaskList);
                  };

                  return (
                    <Fragment key={`${index}+${props.id}`}>
                      <div className="py-4 ">
                        <TaskCard
                          {...props}
                          handleDelete={() => handleDeleteTask(props.id)}
                          handleMarkComplete={handleMarkCompleteTask}
                          handleMarkImportant={handleImportantTask}
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
