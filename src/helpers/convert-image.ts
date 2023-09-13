/**
 * Convert image to base64.
 *
 * @param file Image file.
 * @param callback Function to execute after convert image.
 */
export const convertImageToBase64 = (
  file: File,
  callback: (image: string | ArrayBuffer | null) => void
): void => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    callback(reader.result);
  };
};
