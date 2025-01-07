export const formatDateTime = (date: string): string => {
  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid Date';
  }

  return parsedDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};
