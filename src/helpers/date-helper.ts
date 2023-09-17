/**
 * Get date formatted from string.
 *
 * @param date Date to format.
 * @returns Date formatted.
 */
export const getDateFormattedFromString = (date: Date | string): string => {
  const dateFormatted = new Date(date).toLocaleDateString();
  return dateFormatted;
};

/**
 * Get time formatted from date.
 *
 * @param date Date to format.
 * @returns Time formatted.
 */
export const getTimeFormatted = (date: Date | string): string => {
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();

  return `${newDate.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
