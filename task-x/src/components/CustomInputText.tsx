import {
  CSSProperties,
  ChangeEvent,
  FocusEventHandler,
  Fragment,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import { ENGLISH } from "../constant";
import { colorBlue, colorGray, colorRed, flexCol } from "../style";

const { INPUT } = ENGLISH;

interface CustomInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | undefined;
  InputStyle?: CSSProperties;
  spaceBetweenText?: string;
}

export const CustomInputText: FunctionComponent<CustomInputTextProps> = ({
  error,
  onBlur,
  onChange,
  onFocus,
  value,
  placeholder,
  spaceBetweenText,
}: CustomInputTextProps) => {
  const handleOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  const inputClass = `${
    error !== undefined ? "border border-red-600" : "border"
  }   sm:text-smw-full sm:w-full xl:w-full lg:w-96 xl:w-96 ${
    spaceBetweenText === undefined ? "p-4" : spaceBetweenText
  }`;

  const defaultStyle: CSSProperties = {
    borderRadius: 12,
    borderColor: error === undefined ? colorBlue[100] : colorRed[300],
    backgroundColor: colorGray[100],
    height: 36,
  };

  return (
    <Fragment>
      <div className={`${flexCol} flex-grow`}>
        <input
          type="text"
          value={value}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          className={inputClass}
          style={defaultStyle}
          placeholder={placeholder === undefined ? "" : placeholder}
        />

        {error === undefined ? null : (
          <div className="flex mt-2 text-sm text-red-600 dark:text-red-500">
            <p>
              <span className="font-medium">{INPUT.ERROR_SNAP} </span>
              {error}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};
