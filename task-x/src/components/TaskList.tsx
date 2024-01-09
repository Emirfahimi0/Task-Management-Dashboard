import { CSSProperties, FunctionComponent } from "react";
import { CustomButtonAction } from ".";
import { ENGLISH } from "../constant";
import {
  colorGreen,
  colorRed,
  flexCol,
  fullWidth,
  textBase,
  textSmall,
} from "../style";

const { TASK } = ENGLISH;

interface TaskListProps {
  userId: number;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export const TaskList: FunctionComponent<TaskListProps> = ({
  ...props
}: TaskListProps) => {
  const { title, completed, dueDate } = props;

  const handleDelete = () => {};

  const deleteButtonStyle: CSSProperties = {
    backgroundColor: colorRed[500],
    padding: 8,
    height: "100%",
  };
  let borderColorStatus;

  switch (completed) {
    case false:
      borderColorStatus = colorRed[500];
      break; // red
    case true:
      borderColorStatus = colorGreen[400];
      break;
  }

  const date = `${TASK.DUE_DATE_LABEL}${dueDate}`;

  return (
    <div
      className={`${fullWidth} ${flexCol} md:shadow-md`}
      style={{
        borderRadius: 4,
        borderWidth: 1,
        borderColor: borderColorStatus,
      }}
    >
      <div className={`${fullWidth} md:${fullWidth} p-4 `}>
        <div className={`${flexCol} md:flex-row justify-between items-center`}>
          <div
            className={`${fullWidth} md:w-2/3 text-center md:text-left break-normal mb-2 overflow-hidden`}
          >
            <div>
              <p className={textBase}>{title}</p>
              <p className={`text-gray-400 ${textSmall}`}>{date}</p>
            </div>
          </div>

          <CustomButtonAction
            backgroundColor={"bg-red-600"}
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
  );
};
