/**
 * Get token from local storage.
 *
 * @returns The token.
 */
export const getToken = (): string => {
  return localStorage.getItem("token") || "";
};

/**
 * Set token in local storage.
 *
 * @param token The token to set.
 */
export const setToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("tokenCreatedDate", new Date().getTime().toString());
};

/**
 * Remove token from local storage.
 */
export const removeToken = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenCreatedAt");
};
