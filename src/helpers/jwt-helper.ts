/**
 * Get token from local storage.
 *
 * @returns The token.
 */
export const getToken = (): string => {
  return localStorage.getItem('token') || '';
};
