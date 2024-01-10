import { Fragment, FunctionComponent } from "react";
import { Icon, IconProps } from "./IcoMoon";

interface TaskAlertNotificationProps {
  label: string;
  subLabel?: string;
  visible: boolean;
  IconStyle?: IconProps;
}

export const TaskAlertNotification: FunctionComponent<
  TaskAlertNotificationProps
> = ({ label, subLabel, IconStyle, visible }: TaskAlertNotificationProps) => {
  return (
    <Fragment>
      {visible === false ? null : (
        <div
          className=" animate-bounce bg-blue-900  rounded  p-2 shadow-md"
          role="alert"
        >
          <div className="flex items-center">
            <div className="p-2">
              {IconStyle === undefined ? (
                <Icon icon="alert-circle" size={24} color="white" />
              ) : (
                <Icon {...IconStyle} />
              )}
            </div>
            <div>
              <p className="font-bold text-sm text-white">{label}</p>
              {subLabel === undefined ? null : (
                <p className="text-xs text-white">{subLabel}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
