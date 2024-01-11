import { CSSProperties, ChangeEvent, Fragment, forwardRef } from "react";
import { ENGLISH } from "../../constant";
import { CustomButtonAction, CustomInputText } from "../../components";
import { colorGreen } from "../../style";
import { Tasks } from "../../@types/task";

const { INPUT, FORM } = ENGLISH;

declare interface TaskFormComponentProps {
  handleOnBlurTitle: () => void;
  handleOnChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeDescription: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnFocusTitle: () => void;
  handleSubmit: () => void;
  value: Tasks;
  handleOnFocusDescription: () => void;
  handleOnBlurDescription: () => void;
}

export const TaskFormComponent = forwardRef<
  HTMLSelectElement,
  TaskFormComponentProps
>(
  (
    {
      handleOnBlurTitle,
      handleOnBlurDescription,
      handleOnChangeDescription,
      handleOnFocusTitle,
      handleSubmit,
      handleOnFocusDescription,
      value,
      handleOnChangeTitle,
    }: TaskFormComponentProps,
    selection
  ) => {
    const { title, errorTitle, errorDescription, description } = value;

    const disableContinue = !!(
      errorDescription ||
      errorTitle ||
      title.trim() === "" ||
      description!.trim() === "" ||
      description!.length < 10 ||
      title.length < 10 ||
      title.length > 25 ||
      (errorDescription && errorDescription.length < 25)
    );

    return (
      <Fragment>
        <div
          className="container py-4 shadow-md md:shadow-2xl mt-2"
          style={{ borderRadius: 8 }}
        >
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-4 text-gray-700">
              {FORM.CREATE_TASK_TITLE_LABEL}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {FORM.CREATE_TASK_SUB_LABEL}
            </p>
            <Fragment>
              <div className="mb-4">
                <CustomInputText
                  onBlur={handleOnBlurTitle}
                  spaceBetweenText={"p-2"}
                  value={title}
                  error={errorTitle}
                  onFocus={handleOnFocusTitle}
                  onChange={handleOnChangeTitle}
                  placeholder={INPUT.TITLE_PLACE_HOLDER}
                />
              </div>
              <div className="mb-4">
                <select className="border p-2 rounded w-full" ref={selection}>
                  <option value={"important"}>
                    {FORM.OPTION_IMPORTANT_LABEL}
                  </option>
                  <option value={"complete"}>
                    {FORM.OPTION_COMPLETE_LABEL}
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <CustomInputText
                  onBlur={handleOnBlurDescription}
                  spaceBetweenText={"p-2"}
                  value={description}
                  error={errorDescription}
                  onFocus={handleOnFocusDescription}
                  onChange={handleOnChangeDescription}
                  placeholder={INPUT.DESCRIPTION_PLACE_HOLDER}
                />
              </div>
              <div className="flex justify-center items-center">
                <CustomButtonAction
                  disabledContinue={disableContinue}
                  textColor={"white"}
                  iconStyle={{
                    icon: "add-circle",
                    size: 20,
                  }}
                  label="Add new task"
                  customStyle={buttonStyle}
                  onPress={handleSubmit}
                />
              </div>
            </Fragment>
          </div>
        </div>
      </Fragment>
    );
  }
);

const buttonStyle: CSSProperties = {
  backgroundColor: colorGreen[400],
  borderRadius: 12,
};
