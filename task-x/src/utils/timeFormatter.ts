export const getFormattedDate = () => {
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate: string = currentDate.toLocaleString("en-US", options);

  return formattedDate;
};
