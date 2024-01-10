import { CSSProperties, FunctionComponent } from "react";
import { centerHorizontal, colorGreen } from "../style";
import { Icon, IconProps } from "./IcoMoon";

interface CustomButtonActionProps {
  label?: string;
  onPress: () => void;
  textColor: string;
  disabledContinue: boolean;
  iconStyle: IconProps;
  customStyle?: CSSProperties;
}

export const CustomButtonAction: FunctionComponent<CustomButtonActionProps> = ({
  label,
  textColor,
  disabledContinue,
  onPress,
  iconStyle,
  customStyle,
}: CustomButtonActionProps) => {
  const checkDisable =
    disabledContinue === true ? "opacity-50 cursor-not-allowed" : "";
  const defaultClass = `text-${textColor} px-2 py-2 font-sm rounded-md ${checkDisable} `;
  const buttonStyle =
    customStyle === undefined
      ? defaultStyle
      : { ...defaultStyle, ...customStyle };
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <div>
      <button
        className={defaultClass}
        onClick={handlePress}
        style={buttonStyle}
        disabled={disabledContinue}
      >
        <div className="flex flex-grow">
          <div
            className={`${centerHorizontal} justify-center items-center gap-1`}
          >
            {label === undefined ? null : (
              <span className="text-sm">{label}</span>
            )}
            {iconStyle === undefined ? null : <Icon {...iconStyle} />}
          </div>
        </div>
      </button>
    </div>
  );
};

const defaultStyle: CSSProperties = {
  backgroundColor: colorGreen[400],
  borderRadius: 8,
  textAlign: "center",
  padding: 10,
};
