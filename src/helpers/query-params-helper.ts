import { StandardObject } from "src/interfaces";

/**
 * Get query params from url.
 *
 * @param search The url search.
 * @returns The query params.
 */
export const getQueryParams = (search: string): StandardObject => {
  return (
    search
      ?.split("?")?.[1]
      ?.split("&")
      .reduce((acc, curr) => {
        const [key, value] = curr.split("=");

        return {
          ...acc,
          [key]: value,
        };
      }, {}) || {}
  );
};

/**
 * Get query string from object.
 *
 * @param object The object.
 * @returns The query string.
 */
export const getQueryStringFromObject = (object: StandardObject): string => {
  return Object.keys(object)
    .map((key) => `${key}=${object[key]}`)
    .join("&");
};
