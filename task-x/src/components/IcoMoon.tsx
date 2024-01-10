import Icomoon from "react-icomoon";
import type { IconProps as IcoMoonProps } from "react-icomoon";
import json from "../constant/IcoMoon/selection.json";
import { IconNames } from "../@types/icon";

export type IconProps = Omit<IcoMoonProps, "iconSet"> & { icon: IconNames };

export const Icon = ({ ...restProps }: IconProps) => {
  return <Icomoon iconSet={json} {...restProps} />;
};
