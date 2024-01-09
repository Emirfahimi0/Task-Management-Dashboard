import { FunctionComponent } from "react";
import { Icon, IconProps } from "./IcoMoon";

interface ContainerCardProps {
  label: string;
  subLabel: string;
  iconStyle?: IconProps;
}

export const ContainerCard: FunctionComponent<ContainerCardProps> = ({
  label,
  subLabel,
  iconStyle,
}: ContainerCardProps) => {
  const defaultIconStyle: IconProps =
    iconStyle === undefined
      ? { icon: "file-tray-stacked", color: "black", size: 24 }
      : iconStyle;
  return (
    <div className="md:w-full p-4 shadow-md lg:max-w-md">
      <div className="space-y-2">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xs font-semibold">{label}</h3>
          <Icon {...defaultIconStyle} size={24} />
        </div>
        <p className="text-gray-600">{subLabel}</p>
      </div>
    </div>
  );
};
