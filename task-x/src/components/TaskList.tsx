import { CSSProperties, FunctionComponent } from "react";
import { CustomButtonAction } from ".";
import { ENGLISH } from "../constant";
import {
  colorBlue,
  colorGray,
  colorGreen,
  colorPurple,
  colorRed,
  flexCol,
  flexRow,
  fullWidth,
  textSmall,
} from "../style";
import { TypeStatus } from "../@types/task";

const { TASK } = ENGLISH;

interface TaskListProps {
  id: number;
  title: string;
  urgency?: boolean;
  completed: boolean;
  status: TypeStatus;
  dueDate?: string;
  handleDelete: () => void;
  handleMarkComplete: () => void;
  handleMarkImportant: () => void;
}

export const TaskList: FunctionComponent<TaskListProps> = ({
  ...props
}: TaskListProps) => {
  const {
    title,
    status,
    completed,
    urgency,
    dueDate,
    handleDelete,
    handleMarkComplete,
    handleMarkImportant,
  } = props;

  let borderColorStatus;

  switch (status) {
    case "important":
      borderColorStatus = colorGray[700];
      break;
    case "completed":
      borderColorStatus = colorGreen[400];
      break;
    case "recently":
      borderColorStatus = colorBlue[900];
      break;
    case "incomplete":
      borderColorStatus = colorRed[600];
      break;
  }

  const date = `${TASK.DUE_DATE_LABEL}${dueDate}`;

  const deleteButtonStyle: CSSProperties = {
    backgroundColor: colorRed[500],
    padding: 8,
    height: "100%",
  };
  const markButtonStyle: CSSProperties = {
    backgroundColor: completed === true ? colorBlue[900] : colorBlue[500],
    padding: 8,
    height: "100%",
  };
  const markImportantStyle: CSSProperties = {
    backgroundColor: urgency === true ? colorPurple[400] : colorGreen[500],
    padding: 8,
    height: "100%",
  };

  return (
    <div
      className={`md:shadow-md`}
      style={{
        borderRadius: 4,
        borderWidth: 1,
        borderColor: borderColorStatus,
      }}
    >
      <div className={`${fullWidth} p-4 `}>
        <div
          className={`${flexCol} gap-2 md:flex-row justify-between items-center`}
        >
          <div
            className={`${fullWidth} text-center md:text-left break-normal mb-2 `}
          >
            <div className="max-w-md text-wrap">
              <p className="truncate">{title}</p>
              <p className={`text-gray-400 ${textSmall} `}>{date}</p>
            </div>
          </div>
          <div className={`gap-2 ${flexRow}`}>
            <CustomButtonAction
              textColor={"white"}
              iconStyle={{
                icon: "checkmark-done",
                size: 16,
              }}
              customStyle={markButtonStyle}
              onPress={handleMarkComplete}
              disabledContinue={false}
            />
            <CustomButtonAction
              textColor={"white"}
              iconStyle={{
                icon: "alert-outline",
                size: 16,
              }}
              label="Important"
              customStyle={markImportantStyle}
              onPress={handleMarkImportant}
              disabledContinue={status === "completed"}
            />
            <CustomButtonAction
              textColor={"white"}
              iconStyle={{
                icon: "trash-bin",
                size: 16,
              }}
              customStyle={deleteButtonStyle}
              onPress={handleDelete}
              disabledContinue={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
