import { FunctionComponent, createContext, useContext, ReactNode } from "react";
import { Icon, IconProps } from "./IcoMoon";
import { colorGreen } from "../style";

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

interface SideBarComponentProps {
  children?: ReactNode;
  expanded: boolean;
  handleExpanded: () => void;
}

export const SideBarComponent: FunctionComponent<SideBarComponentProps> = ({
  children,
  expanded,
  handleExpanded,
}) => {
  return (
    <aside>
      <nav className="h-full flex flex-col bg-blue-900 shadow-sm">
        <div className="p-4 pb-2 flex justify-end">
          <button
            onClick={handleExpanded}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <Icon
                icon="chevron-back-circle"
                size={24}
                color={colorGreen[100]}
              />
            ) : (
              <Icon icon="expand" size={24} color={colorGreen[600]} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul
            className={`flex flex-col px-3 ${
              expanded ? "md:flex-col" : "flex-row"
            }`}
          >
            {children}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

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
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
};
