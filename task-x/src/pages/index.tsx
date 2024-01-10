import { Fragment, FunctionComponent, useState } from "react";
import { useTaskList } from "../context";

import { TaskListPage } from "./TaskList";
import {
  SideBarComponent,
  SidebarItem,
  SidebarItemProps,
} from "../components/SideBarComponent";
import { colorGreen } from "../style";
import { CreateTaskList } from "./TaskList/TaskForm";

export type currentContent = "taskList" | "createForm";

export const DashBoard: FunctionComponent = () => {
  const { taskList, addTask, showAlert, setExistingTaskList, updateTaskList } =
    useTaskList();
  const [expanded, setExpanded] = useState(true);
  const [currentContent, setCurrentContent] =
    useState<currentContent>("taskList");

  const taskListProps = {
    taskList,
    addTask,
    showAlert,
    setExistingTaskList,
    updateTaskList,
  };

  const handleExpand = () => {
    return setExpanded(!expanded);
  };

  const handleCurrentContent = (content: currentContent) => {
    setCurrentContent(content);
  };

  let content: JSX.Element = <div />;

  if (currentContent === "taskList") {
    content = <TaskListPage {...taskListProps} />;
  }

  if (currentContent === "createForm") {
    content = <CreateTaskList />;
  }

  const itemsList: SidebarItemProps[] = [
    {
      iconStyle: {
        icon: "file-tray-stacked",
        size: 24,
        color: colorGreen[600],
      },
      onPress: () => handleCurrentContent("createForm"),
      text: "Create Task",
      active: currentContent === "createForm",
    },
    {
      iconStyle: {
        icon: "list-circle",
        size: 24,
        color: colorGreen[600],
      },
      onPress: () => handleCurrentContent("taskList"),
      text: "See List",
      active: currentContent === "taskList",
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row min-h-screen xs:max-w-full max-w-screen-3xl">
        <SideBarComponent expanded={expanded} handleExpanded={handleExpand}>
          {itemsList.map((props) => {
            return <SidebarItem {...props} />;
          })}
        </SideBarComponent>
        <div className={`p-4 md:w-full`}>{content}</div>
      </div>
    </Fragment>
  );
};
