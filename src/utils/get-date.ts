export const getDate = (date: string) => {
  const newDate = new Date(Date.parse(date));
  return newDate.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
};
