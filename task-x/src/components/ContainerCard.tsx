import { FunctionComponent } from "react";
import { Icon, IconProps } from "./IcoMoon";
import { flexRow, fullWidth, textBase, textXSmall } from "../style";
import { Tasks } from "../@types/task";

export interface ContainerCardProps {
  iconStyle?: IconProps;
  label: string;
  currentList: Tasks[];
  subLabel: string;
}

export const ContainerCard: FunctionComponent<ContainerCardProps> = ({
  label,
  subLabel,
  iconStyle,
  currentList,
}: ContainerCardProps) => {
  const defaultIconStyle: IconProps =
    iconStyle === undefined
      ? { icon: "file-tray-stacked", color: "black", size: 24 }
      : iconStyle;

  return (
    <div className={`md:${fullWidth} p-4 shadow-md  sm:w-full md:w-auto`}>
      <div className="space-y-2 flex flex-col">
        <div className={`${flexRow} justify-between items-center`}>
          <h3 className={`${textXSmall} font-semibold`}>{label}</h3>
          <Icon {...defaultIconStyle} size={24} />
        </div>
        {currentList.length === 0 || currentList === undefined
          ? null
          : currentList.slice(0, 3).map((eachlist, index) => {
              return (
                <div className={`w-full sm:w-64`} key={index}>
                  <li className="truncate">
                    <span className={`${textXSmall} `}>{eachlist.title}</span>
                  </li>
                </div>
              );
            })}

        <p className={`${textBase} font-bold`}>{subLabel}</p>
      </div>
    </div>
  );
};
