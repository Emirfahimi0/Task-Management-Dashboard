export type ColorShade = {
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
};

export type ColorPalette = {
  [key: string]: ColorShade | string;
};

export type ColorStyle = {
  blue: ColorPalette;
  purple: ColorPalette;
  pink: ColorPalette;
  orange: string;
  green: ColorPalette;
  yellow: string;
  white: string;
  red: ColorPalette;
  "gray-dark": string;
  gray: ColorPalette;
  "gray-light": string;
};
