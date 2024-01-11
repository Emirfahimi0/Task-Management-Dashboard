import { FunctionComponent, createContext, ReactNode } from "react";
import { Icon } from "../IcoMoon";
import { colorGreen } from "../../style";

interface SidebarContextProps {
  expanded: boolean;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

interface SideBarComponentProps {
  children?: ReactNode;
  expanded: boolean;
  handleExpanded: () => void;
}

export const SideBar: FunctionComponent<SideBarComponentProps> = ({
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
