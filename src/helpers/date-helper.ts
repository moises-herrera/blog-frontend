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
