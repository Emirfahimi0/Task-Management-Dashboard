import { ColorShade, ColorStyle } from "../@types/colorPalletes";
import { colorStyle } from "../style";

// Utility function to generate Tailwind CSS class string for a specific color and shade
export const generateColorClass = (
  color: keyof ColorStyle,
  shade?: keyof ColorShade
): string => {
  const colorPalette = colorStyle[color];

  if (typeof colorPalette === "string") {
    return `bg-${colorPalette}`;
  }

  if (shade && colorPalette[shade]) {
    return `bg-${color}-${shade}`;
  }

  return "";
};
