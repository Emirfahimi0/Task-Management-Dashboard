import { Fragment, FunctionComponent } from "react";

export const CreateTaskList: FunctionComponent = () => {
  return (
    <Fragment>
      <div
        className="container flex-1 w-full"
        style={{ backgroundColor: "green" }}
      >
        hello
      </div>
    </Fragment>
  );
};
{
  /* <div className={`${flexCol}`}>
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
</div> */
}
