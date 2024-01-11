import { FunctionComponent, useContext } from "react";
import { Icon, IconProps } from "../IcoMoon";
import { SidebarContext } from "..";

export interface SidebarItemProps {
  active?: boolean;
  iconStyle: IconProps;
  onPress: () => void;
  text: string;
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = ({
  iconStyle,
  text,
  onPress,
  active,
}: SidebarItemProps) => {
  const { expanded } = useContext(SidebarContext) || {};

  return (
    <li
      onClick={onPress}
      className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-green-400 to-green-100 text-white"
              : " text-green-400 hover:bg-blue-900 hover:text-white"
          }
      `}
    >
      <Icon {...iconStyle} />
      <span
        className={`overflow-hidden transition-all ${
          expanded ? " max-md:w-auto ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
};
