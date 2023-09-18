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
 * Get time string from date.
 *
 * @param date Date to format.
 * @returns Time string.
 */
export const getTimeString = (date: Date | string): string => {
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();

  return `${newDate.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

/**
 * Get time formatted from date.
 *
 * @param date Date to format.
 * @returns Time formatted.
 */
export const getTimeFormatted = (date: Date | string): string => {
  const isToday =
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString();

  if (isToday) return getTimeString(date);

  return getDateFormattedFromString(date);
};

/**
 * Whether the date are the same.
 *
 * @param dateInput1 The first date.
 * @param dateInput2 The second date.
 * @returns
 */
export const isSameDate = (
  dateInput1: Date | string,
  dateInput2: Date | string
): boolean => {
  const date1 = new Date(dateInput1);
  const date2 = new Date(dateInput2);

  return date1.toLocaleDateString() === date2.toLocaleDateString();
};
