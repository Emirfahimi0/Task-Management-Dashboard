import { CSSProperties, Fragment, FunctionComponent } from "react";
import {
  colorBlue,
  colorGray,
  colorGreen,
  colorPurple,
  colorRed,
  textLarge,
  textSmall,
} from "../../style";
import { TypeStatus } from "../../@types/task";
import { ENGLISH } from "../../constant";
import { CustomButtonAction, CustomButtonActionProps } from "..";

const { TASK } = ENGLISH;

interface TaskCardProps {
  title: string;
  urgency?: boolean;
  completed: boolean;
  status: TypeStatus;
  dueDate?: string;
  handleDelete: () => void;
  handleMarkComplete: () => void;
  handleMarkImportant: () => void;
}

export const TaskCard: FunctionComponent<TaskCardProps> = ({
  title,
  urgency,
  completed,
  status,
  dueDate,
  handleDelete,
  handleMarkComplete,
  handleMarkImportant,
}: TaskCardProps) => {
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

  const deleteButtonStyle: CSSProperties = {
    backgroundColor: colorRed[500],
    padding: 8,
    height: "100%",
  };

  const markImportantStyle: CSSProperties = {
    backgroundColor: urgency === true ? colorPurple[400] : colorGreen[500],
    padding: 8,
    height: "100%",
  };
  const itemsButton: CustomButtonActionProps[] = [
    {
      textColor: "white",
      iconStyle: {
        icon: "alert-outline",
        size: 16,
      },
      customStyle: markImportantStyle,
      onPress: handleMarkImportant,
      disabledContinue: status === "completed",
    },
    {
      textColor: "white",
      iconStyle: {
        icon: "trash-bin",
        size: 16,
      },
      customStyle: deleteButtonStyle,
      onPress: handleDelete,
      disabledContinue: false,
    },
  ];

  const date = `${TASK.DUE_DATE_LABEL}${dueDate}`;
  return (
    <ul>
      <li
        className="p-2 rounded-lg md:shadow-md"
        style={{ borderColor: borderColorStatus, borderWidth: 1 }}
      >
        <div className="flex align-middle ">
          <div className="p-2">
            <input
              type="checkbox"
              className={`h-6 w-6 rounded-md`}
              value="true"
              checked={completed}
              onClick={handleMarkComplete}
            />
          </div>
          <div className="p-2 max-w-md text-wrap flex-grow">
            <p
              className={`${textLarge} ${
                completed === true
                  ? "line-through text-gray-400"
                  : " text-blue-900"
              }`}
            >
              {title}
            </p>
            <p className={`text-gray-400 ${textSmall} `}>{date}</p>
          </div>
          <div className="flex flex-1 justify-end items-center gap-2">
            {itemsButton.map((props, key) => {
              return (
                <Fragment key={key}>
                  <CustomButtonAction {...props} />
                </Fragment>
              );
            })}
          </div>
        </div>
        <hr className="mt-2" />
      </li>
    </ul>
  );
};
