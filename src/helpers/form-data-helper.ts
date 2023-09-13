import { StandardObject } from "src/interfaces";

/**
 * Get form data from object.
 *
 * @param data The object to convert to form data.
 * @returns The form data.
 */
export const getFormDataFromObject = (data: StandardObject): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  return formData;
};
