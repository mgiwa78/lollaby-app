export const formateDate = (date: string) => {
  const unformated = new Date(date);
  const day = unformated.getDate();
  const month = unformated.getMonth() + 1;
  const year = unformated.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};
