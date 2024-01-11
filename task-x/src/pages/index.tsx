import { Fragment, FunctionComponent, useState } from "react";
import { useTaskList } from "../context";

import { TaskListPage } from "./TaskList";
import { colorGreen } from "../style";
import { CreateTaskList } from "./TaskForm";
import { SideBar, SidebarItem, SidebarItemProps } from "../components";

export type currentContent = "taskList" | "createForm";

export const DashBoard: FunctionComponent = () => {
  const { taskList, addTask, showAlert, setExistingTaskList, updateTaskList } =
    useTaskList();
  const [expanded, setExpanded] = useState(true);
  const [currentContent, setCurrentContent] =
    useState<currentContent>("taskList");

  const props = {
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
    content = <TaskListPage {...props} />;
  }

  if (currentContent === "createForm") {
    content = <CreateTaskList {...props} />;
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
      <div className="flex flex-col md:flex-row min-h-screen  max-w-screen-3xl">
        <SideBar expanded={expanded} handleExpanded={handleExpand}>
          {itemsList.map((props, index) => {
            return (
              <Fragment key={index}>
                <SidebarItem {...props} />
              </Fragment>
            );
          })}
        </SideBar>
        <div className="flex flex-1">
          <main className="flex-1 px-4 py-8">{content}</main>
        </div>
      </div>
    </Fragment>
  );
};
