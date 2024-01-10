export const getFormattedDate = () => {
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    month: "long",
    second: "numeric",
    year: "numeric",
  };

  const formattedDate: string = currentDate.toLocaleString("en-US", options);

  return formattedDate;
};
